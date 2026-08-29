import { useEffect, useMemo, useState } from 'react'
import {
  Calendar, User, Users, Phone, Mail, ArrowLeft, ArrowRight, Check, Download,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRooms } from '../hooks/useRooms.js'
import { apiFetch } from '../lib/api.js'
import { isCustomerAuthed, getCustomerInfo } from '../lib/customerAuth.js'

const stepLabels = ['Dates', 'Voyageurs', 'Chambre', 'Coordonnées', 'Résumé', 'Confirmation']

function daysBetween(a, b) {
  const d = Math.round((new Date(b) - new Date(a)) / 86400000)
  return Math.max(1, d || 1)
}

function downloadConfirmation({ resNum, room, checkin, checkout, nights, total, guest }) {
  const lines = [
    'HÔTEL EL AZIZ — Confirmation de réservation',
    '='.repeat(44),
    '',
    `Numéro de réservation : ${resNum}`,
    `Chambre               : ${room?.name || ''}`,
    `Arrivée                : ${checkin}`,
    `Départ                 : ${checkout}`,
    `Nombre de nuits        : ${nights}`,
    `Client                 : ${guest.name}`,
    `Téléphone              : ${guest.phone}`,
    `Email                  : ${guest.email}`,
    `Total                  : ${total.toLocaleString()} DA`,
    '',
    'Conservez ce numéro : il vous permettra de suivre votre',
    'réservation sur hotel-el-aziz.vercel.app/compte.',
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${resNum}.txt`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function Booking() {
  const [step, setStep] = useState(1)
  const [checkin, setCheckin] = useState('2026-08-28')
  const [checkout, setCheckout] = useState('2026-08-31')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [roomCount, setRoomCount] = useState(1)
  const { rooms, loading: roomsLoading } = useRooms()
  const availableRooms = useMemo(() => rooms.filter((r) => r.slug !== 'chambre-simple'), [rooms])
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [guest, setGuest] = useState({ name: '', phone: '', email: '' })
  const [resNum, setResNum] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [bookingError, setBookingError] = useState('')

  // Pré-remplit les coordonnées si le client est connecté
  useEffect(() => {
    if (isCustomerAuthed()) {
      const c = getCustomerInfo()
      if (c) setGuest((g) => ({ ...g, name: g.name || c.name || '', email: g.email || c.email || '', phone: g.phone || c.phone || '' }))
    }
  }, [])

  // Choisit une chambre par défaut (Chambre Double si disponible) dès que la liste arrive
  useEffect(() => {
    if (!selectedRoom && availableRooms.length) {
      setSelectedRoom(availableRooms.find((r) => r.slug === 'chambre-double') || availableRooms[0])
    }
  }, [availableRooms, selectedRoom])

  const nights = useMemo(() => daysBetween(checkin, checkout), [checkin, checkout])
  const subtotal = selectedRoom ? selectedRoom.price * nights : 0
  const tax = 200 * nights
  const total = subtotal + tax

  const goTo = (n) => {
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const confirm = async () => {
    if (!selectedRoom) return
    setSubmitting(true)
    setBookingError('')
    try {
      const customer = isCustomerAuthed() ? getCustomerInfo() : null
      const booking = await apiFetch('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          room_slug: selectedRoom.slug,
          check_in: checkin,
          check_out: checkout,
          adults,
          children,
          rooms_count: roomCount,
          guest_name: guest.name,
          guest_email: guest.email,
          guest_phone: guest.phone,
          customer_id: customer?.id ?? null,
        }),
      })
      setResNum(booking.reservation_number)
      goTo(6)
    } catch (err) {
      setBookingError(err.message || "Une erreur est survenue, veuillez réessayer.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-24 pb-24 bg-bg min-h-screen">
      {/* stepper */}
      <div className="bg-bg-light border-b border-line py-6 mb-12">
        <div className="max-w-[920px] mx-auto px-6 flex items-center justify-between">
          {stepLabels.map((label, i) => {
            const n = i + 1
            const isActive = n === step
            const isDone = n < step
            return (
              <div key={label} className="flex-1 flex flex-col items-center gap-1.5 relative">
                {i < stepLabels.length - 1 && (
                  <div
                    className={`absolute top-[15px] left-1/2 w-full h-0.5 ${
                      isDone ? 'bg-gold' : 'bg-line'
                    }`}
                  />
                )}
                <div
                  className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                    isActive
                      ? 'bg-navy text-white'
                      : isDone
                      ? 'bg-gold text-navy-deep'
                      : 'bg-line text-ink-soft'
                  }`}
                >
                  {n}
                </div>
                <div className={`text-[11px] font-semibold hidden sm:block ${isActive ? 'text-navy' : 'text-ink-soft'}`}>
                  {label}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="max-w-[920px] mx-auto px-6">
        <div className="bg-bg-light border border-line rounded-2xl p-6 md:p-9 shadow-[0_20px_50px_-34px_rgba(15,28,56,0.35)]">

          {step === 1 && (
            <div>
              <h2 className="font-display text-2xl text-navy-deep mb-1.5">Choisissez vos dates</h2>
              <p className="text-ink-soft text-sm mb-7">Sélectionnez votre date d'arrivée et de départ</p>
              <div className="grid md:grid-cols-2 gap-4 mb-7">
                <div>
                  <label className="block text-xs font-bold text-navy mb-2">Date d'arrivée (Check-in)</label>
                  <div className="flex items-center gap-2 border border-line rounded-lg px-3.5 py-3 text-sm">
                    <Calendar size={16} className="text-gold" />
                    <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className="w-full outline-none bg-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy mb-2">Date de départ (Check-out)</label>
                  <div className="flex items-center gap-2 border border-line rounded-lg px-3.5 py-3 text-sm">
                    <Calendar size={16} className="text-gold" />
                    <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className="w-full outline-none bg-transparent" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={() => goTo(2)} className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-deep font-bold px-6 py-3 rounded-lg text-sm">
                  Continuer <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl text-navy-deep mb-1.5">Voyageurs</h2>
              <p className="text-ink-soft text-sm mb-7">Combien de personnes séjourneront à l'hôtel ?</p>
              <div className="grid grid-cols-3 gap-4 mb-7">
                {[
                  ['Adultes', adults, setAdults, 1],
                  ['Enfants', children, setChildren, 0],
                  ['Chambres', roomCount, setRoomCount, 1],
                ].map(([label, val, setter, min]) => (
                  <div key={label}>
                    <label className="block text-xs font-bold text-navy mb-2">{label}</label>
                    <div className="flex items-center justify-between border border-line rounded-lg px-3.5 py-2.5">
                      <button onClick={() => setter(Math.max(min, val - 1))} className="w-[26px] h-[26px] rounded-md border border-line font-bold text-navy">−</button>
                      <span className="font-bold">{val}</span>
                      <button onClick={() => setter(val + 1)} className="w-[26px] h-[26px] rounded-md border border-line font-bold text-navy">+</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <button onClick={() => goTo(1)} className="inline-flex items-center gap-2 border border-line text-ink-soft hover:border-navy hover:text-navy px-6 py-3 rounded-lg text-sm">
                  <ArrowLeft size={15} /> Retour
                </button>
                <button onClick={() => goTo(3)} className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-deep font-bold px-6 py-3 rounded-lg text-sm">
                  Continuer <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-display text-2xl text-navy-deep mb-1.5">Choisissez votre chambre</h2>
              <p className="text-ink-soft text-sm mb-7">Sélectionnez le type de chambre qui vous convient</p>

              <div className="space-y-3.5 mb-7">
                {roomsLoading ? (
                  <p className="text-ink-soft text-center py-4">Chargement des chambres…</p>
                ) : (
                  availableRooms.map((r) => (
                    <div
                      key={r.slug}
                      onClick={() => setSelectedRoom(r)}
                      className={`flex items-center gap-4 border rounded-xl p-3.5 cursor-pointer transition-colors ${
                        selectedRoom?.slug === r.slug ? 'border-gold bg-gold/5' : 'border-line hover:border-gold'
                      }`}
                    >
                      <div className="photo-placeholder w-24 h-[76px] rounded-lg flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-navy-deep text-[15.5px] mb-1">{r.name}</h4>
                        <div className="text-[12.5px] text-ink-soft flex gap-2.5">
                          <span>{r.capacity}</span><span>{r.bed?.split('·')[0]}</span><span>Wi-Fi</span>
                        </div>
                      </div>
                      <div className="text-right font-bold text-navy-deep text-[15px]">
                        {r.price.toLocaleString()} DA<small className="block font-medium text-ink-soft text-[11.5px]">/ nuit</small>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${selectedRoom?.slug === r.slug ? 'border-gold' : 'border-line'}`}>
                        {selectedRoom?.slug === r.slug && <div className="w-2.5 h-2.5 rounded-full bg-gold" />}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex justify-between">
                <button onClick={() => goTo(2)} className="inline-flex items-center gap-2 border border-line text-ink-soft hover:border-navy hover:text-navy px-6 py-3 rounded-lg text-sm">
                  <ArrowLeft size={15} /> Retour
                </button>
                <button onClick={() => goTo(4)} className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-deep font-bold px-6 py-3 rounded-lg text-sm">
                  Continuer <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="font-display text-2xl text-navy-deep mb-1.5">Vos coordonnées</h2>
              <p className="text-ink-soft text-sm mb-7">Ces informations serviront à confirmer votre réservation</p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-navy mb-2">Nom complet</label>
                  <div className="flex items-center gap-2 border border-line rounded-lg px-3.5 py-3 text-sm">
                    <User size={16} className="text-gold" />
                    <input value={guest.name} onChange={(e) => setGuest({ ...guest, name: e.target.value })} placeholder="Votre nom" className="w-full outline-none bg-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy mb-2">Téléphone</label>
                  <div className="flex items-center gap-2 border border-line rounded-lg px-3.5 py-3 text-sm">
                    <Phone size={16} className="text-gold" />
                    <input value={guest.phone} onChange={(e) => setGuest({ ...guest, phone: e.target.value })} placeholder="0X XX XX XX XX" className="w-full outline-none bg-transparent" />
                  </div>
                </div>
              </div>
              <div className="mb-7">
                <label className="block text-xs font-bold text-navy mb-2">Email</label>
                <div className="flex items-center gap-2 border border-line rounded-lg px-3.5 py-3 text-sm">
                  <Mail size={16} className="text-gold" />
                  <input value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} placeholder="vous@exemple.com" className="w-full outline-none bg-transparent" />
                </div>
              </div>
              <div className="flex justify-between">
                <button onClick={() => goTo(3)} className="inline-flex items-center gap-2 border border-line text-ink-soft hover:border-navy hover:text-navy px-6 py-3 rounded-lg text-sm">
                  <ArrowLeft size={15} /> Retour
                </button>
                <button onClick={() => goTo(5)} className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-deep font-bold px-6 py-3 rounded-lg text-sm">
                  Continuer <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="font-display text-2xl text-navy-deep mb-1.5">Résumé de la réservation</h2>
              <p className="text-ink-soft text-sm mb-7">Vérifiez les détails avant de confirmer</p>
              <div className="mb-4">
                {[
                  ['Chambre', selectedRoom?.name],
                  ['Arrivée', checkin],
                  ['Départ', checkout],
                  ['Voyageurs', `${adults} adultes, ${children} enfants`],
                  ['Nombre de nuits', nights],
                  [`Prix chambre (${nights} × ${(selectedRoom?.price || 0).toLocaleString()} DA)`, `${subtotal.toLocaleString()} DA`],
                  ['Taxe de séjour', `${tax.toLocaleString()} DA`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-3 border-b border-line text-sm">
                    <span className="text-ink-soft">{k}</span><span>{v}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-4 font-extrabold text-lg text-navy-deep">
                  <span>Total</span><span>{total.toLocaleString()} DA</span>
                </div>
              </div>
              {bookingError && (
                <p className="text-[#C24C4C] text-sm mb-3">{bookingError}</p>
              )}
              <div className="flex justify-between mt-4">
                <button onClick={() => goTo(4)} className="inline-flex items-center gap-2 border border-line text-ink-soft hover:border-navy hover:text-navy px-6 py-3 rounded-lg text-sm">
                  <ArrowLeft size={15} /> Retour
                </button>
                <button
                  onClick={confirm}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-60 text-navy-deep font-bold px-6 py-3 rounded-lg text-sm"
                >
                  {submitting ? 'Envoi en cours…' : 'Confirmer la réservation'} <Check size={15} />
                </button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="text-center py-5">
              <div className="w-[74px] h-[74px] rounded-full bg-[#E7F5EC] flex items-center justify-center mx-auto mb-5">
                <Check size={36} className="text-[#3E8B5C]" />
              </div>
              <h2 className="font-display text-2xl mb-1.5">Votre réservation est confirmée ✓</h2>
              <p className="text-ink-soft text-sm">Notez bien votre numéro de réservation ci-dessous</p>
              <div className="inline-block bg-bg border border-dashed border-gold px-5 py-2 rounded-lg font-bold text-navy tracking-wide my-4">
                {resNum}
              </div>
              <div className="max-w-[420px] mx-auto mb-7 text-left">
                {[
                  ['Chambre', selectedRoom?.name],
                  ['Arrivée', checkin],
                  ['Départ', checkout],
                  ['Total', `${total.toLocaleString()} DA`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-3 border-b border-line text-sm">
                    <span className="text-ink-soft">{k}</span><span>{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={() => downloadConfirmation({ resNum, room: selectedRoom, checkin, checkout, nights, total, guest })}
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-deep font-bold px-6 py-3 rounded-lg text-sm"
                >
                  <Download size={16} /> Télécharger la confirmation
                </button>
                <Link to="/" className="inline-flex items-center gap-2 border border-line text-ink-soft hover:border-navy hover:text-navy px-6 py-3 rounded-lg text-sm">
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

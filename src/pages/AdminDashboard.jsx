import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarCheck2, LogIn, LogOut, DoorOpen, DoorClosed, Wallet,
  Check, Clock, CheckCheck, X, Loader2, AlertCircle,
} from 'lucide-react'
import AdminLayout from '../components/AdminLayout.jsx'
import { adminFetch } from '../lib/adminAuth.js'

const statusBadge = {
  confirme: { label: 'Confirmé', cls: 'bg-[#E7F5EC] text-[#3E8B5C]', icon: Check },
  en_attente: { label: 'En attente', cls: 'bg-[#FBEEDF] text-[#C97B2A]', icon: Clock },
  termine: { label: 'Terminé', cls: 'bg-[#EEEEF0] text-[#8A8D93]', icon: CheckCheck },
  annule: { label: 'Annulé', cls: 'bg-[#FBE9E9] text-[#C24C4C]', icon: X },
}
const payLabel = { paye: 'Payé', partiel: 'Partiel', non_paye: 'Non payé', rembourse: 'Remboursé' }
const payBadge = {
  paye: 'bg-[#E7F5EC] text-[#3E8B5C]',
  partiel: 'bg-[#FBEEDF] text-[#C97B2A]',
  non_paye: 'bg-[#EEEEF0] text-[#8A8D93]',
  rembourse: 'bg-[#FBE9E9] text-[#C24C4C]',
}

function fmtDate(d) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}
function fmtMoney(n) {
  return new Intl.NumberFormat('fr-FR').format(n)
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    Promise.all([
      adminFetch('/admin/stats'),
      adminFetch('/bookings'),
    ])
      .then(([statsData, bookingsData]) => {
        if (cancelled) return
        setStats(statsData)
        setBookings(bookingsData.slice(0, 6))
      })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const statCards = stats ? [
    { icon: CalendarCheck2, tone: 'bg-navy', iconTone: 'text-gold-light', value: stats.reservations_today, label: 'Réservations aujourd\'hui' },
    { icon: LogIn, tone: 'bg-[#E7F5EC]', iconTone: 'text-[#3E8B5C]', value: stats.checkins_today, label: 'Arrivées (Check-ins)' },
    { icon: LogOut, tone: 'bg-[#FBEEDF]', iconTone: 'text-[#C97B2A]', value: stats.checkouts_today, label: 'Départs (Check-outs)' },
    { icon: DoorOpen, tone: 'bg-[#E7F5EC]', iconTone: 'text-[#3E8B5C]', value: stats.rooms_available, label: 'Chambres disponibles' },
    { icon: DoorClosed, tone: 'bg-[#EEEEF0]', iconTone: 'text-[#8A8D93]', value: stats.rooms_occupied, label: 'Chambres occupées' },
    { icon: Wallet, tone: 'bg-gold/15', iconTone: 'text-gold', value: `${fmtMoney(stats.revenue_today)} DA`, label: 'Revenu du jour' },
  ] : []

  return (
    <AdminLayout
      title="Vue d'ensemble"
      subtitle={new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
    >
      {loading && (
        <div className="flex items-center gap-2 text-ink-soft text-sm py-10 justify-center">
          <Loader2 size={18} className="animate-spin" /> Chargement…
        </div>
      )}

      {error && !loading && (
        <div className="flex items-center gap-2 bg-[#FBE9E9] text-[#C24C4C] text-sm font-medium px-4 py-3 rounded-lg mb-6">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {statCards.map((s) => (
              <div key={s.label} className="bg-bg-light border border-line rounded-xl p-[18px]">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3.5 ${s.tone}`}>
                  <s.icon size={17} className={s.iconTone} />
                </div>
                <h3 className="font-display text-2xl text-navy-deep font-extrabold mb-0.5">{s.value}</h3>
                <p className="text-xs text-ink-soft">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-bg-light border border-line rounded-2xl overflow-hidden">
            <div className="px-[22px] py-5 flex items-center justify-between border-b border-line">
              <h2 className="text-[16.5px] font-bold text-navy-deep">Réservations récentes</h2>
              <Link to="/admin/reservations" className="text-[13px] font-semibold text-gold hover:underline">Voir tout →</Link>
            </div>
            {bookings.length === 0 ? (
              <p className="text-center text-ink-soft text-sm py-10">Aucune réservation pour le moment</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-[11.5px] uppercase tracking-wide text-ink-soft">
                      <th className="text-right font-bold px-[22px] py-3 border-b border-line">Client</th>
                      <th className="text-right font-bold px-[22px] py-3 border-b border-line">Chambre</th>
                      <th className="text-right font-bold px-[22px] py-3 border-b border-line">Arrivée</th>
                      <th className="text-right font-bold px-[22px] py-3 border-b border-line">Départ</th>
                      <th className="text-right font-bold px-[22px] py-3 border-b border-line">Statut</th>
                      <th className="text-right font-bold px-[22px] py-3 border-b border-line">Paiement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((r, i) => {
                      const st = statusBadge[r.status] || statusBadge.en_attente
                      return (
                        <tr key={r.id} className={`hover:bg-bg ${i < bookings.length - 1 ? 'border-b border-line' : ''}`}>
                          <td className="px-[22px] py-3.5">
                            <div className="font-semibold text-sm">{r.guest_name}</div>
                            <div className="text-[11.5px] text-ink-soft">{r.reservation_number}</div>
                          </td>
                          <td className="px-[22px] py-3.5 text-sm">{r.room_name}</td>
                          <td className="px-[22px] py-3.5 text-sm">{fmtDate(r.check_in)}</td>
                          <td className="px-[22px] py-3.5 text-sm">{fmtDate(r.check_out)}</td>
                          <td className="px-[22px] py-3.5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${st.cls}`}>
                              <st.icon size={11} /> {st.label}
                            </span>
                          </td>
                          <td className="px-[22px] py-3.5">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${payBadge[r.payment_status]}`}>
                              {payLabel[r.payment_status]}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  )
}

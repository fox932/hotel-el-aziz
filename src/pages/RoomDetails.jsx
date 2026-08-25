import { useParams, Link, Navigate } from 'react-router-dom'
import {
  User, BedDouble, Ruler, Bath, Wifi, Thermometer, Tv, Car, Calendar, Users, DoorClosed,
} from 'lucide-react'
import { useRoom } from '../hooks/useRooms.js'

const amenityIcons = {
  'Wi-Fi gratuit': Wifi,
  'Salle de bain privée': Bath,
  'Climatisation': Thermometer,
  TV: Tv,
  Parking: Car,
  'Service de chambre': User,
}

export default function RoomDetails() {
  const { slug } = useParams()
  const { room, loading } = useRoom(slug)

  if (loading) {
    return <p className="text-ink-soft text-center pt-32 pb-20">Chargement de la chambre…</p>
  }
  if (!room) return <Navigate to="/chambres" replace />

  const nights = 3
  const subtotal = room.price * nights
  const tax = 200 * nights
  const total = subtotal + tax

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        <div className="text-sm text-ink-soft mb-6">
          <Link to="/chambres" className="hover:text-navy">Chambres</Link> / {room.name}
        </div>

        <div className="grid md:grid-cols-[1.4fr_1fr] gap-3.5 mb-10">
          <div className="photo-placeholder h-[420px] rounded-2xl" />
          <div className="grid grid-rows-2 gap-3.5">
            <div className="photo-placeholder rounded-2xl" />
            <div className="photo-placeholder rounded-2xl" />
          </div>
        </div>

        <div className="grid md:grid-cols-[1.5fr_1fr] gap-14 items-start">
          <div>
            <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
              <h1 className="font-display text-3xl text-navy-deep">{room.name}</h1>
              <div className="flex items-center gap-2 text-gold text-sm">
                ★★★☆☆ <span className="text-ink-soft text-[13px]">Hôtel 3 étoiles</span>
              </div>
            </div>
            <p className="text-ink-soft text-[15.5px] my-5">{room.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2.5 bg-bg rounded-lg px-3.5 py-3 text-sm">
                <User size={17} className="text-gold" /> {room.capacity}
              </div>
              <div className="flex items-center gap-2.5 bg-bg rounded-lg px-3.5 py-3 text-sm">
                <BedDouble size={17} className="text-gold" /> {room.bed}
              </div>
              {room.amenities.map((a) => {
                const Icon = amenityIcons[a] || Ruler
                return (
                  <div key={a} className="flex items-center gap-2.5 bg-bg rounded-lg px-3.5 py-3 text-sm">
                    <Icon size={17} className="text-gold" /> {a}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-bg-light border border-line rounded-2xl p-6 sticky top-24 shadow-[0_20px_50px_-30px_rgba(15,28,56,0.3)]">
            <div className="flex items-baseline gap-1.5 mb-5">
              <span className="font-display text-2xl text-navy-deep font-bold">
                {room.price.toLocaleString()} DA
              </span>
              <span className="text-ink-soft text-[13.5px]">/ nuit</span>
            </div>

            <div className="mb-3.5">
              <label className="block text-[11px] font-bold text-navy uppercase tracking-wide mb-1.5">Check-in</label>
              <div className="flex items-center gap-2 border border-line rounded-lg px-3 py-2.5 text-sm">
                <Calendar size={15} className="text-gold" /> Date
              </div>
            </div>
            <div className="mb-3.5">
              <label className="block text-[11px] font-bold text-navy uppercase tracking-wide mb-1.5">Check-out</label>
              <div className="flex items-center gap-2 border border-line rounded-lg px-3 py-2.5 text-sm">
                <Calendar size={15} className="text-gold" /> Date
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <div>
                <label className="block text-[11px] font-bold text-navy uppercase tracking-wide mb-1.5">Voyageurs</label>
                <div className="flex items-center gap-2 border border-line rounded-lg px-3 py-2.5 text-sm">
                  <Users size={15} className="text-gold" /> {room.guests}
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-navy uppercase tracking-wide mb-1.5">Chambres</label>
                <div className="flex items-center gap-2 border border-line rounded-lg px-3 py-2.5 text-sm">
                  <DoorClosed size={15} className="text-gold" /> 1
                </div>
              </div>
            </div>

            <div className="border-t border-line pt-4 text-[13.5px] space-y-2">
              <div className="flex justify-between text-ink-soft">
                <span>{room.price.toLocaleString()} DA × {nights} nuits</span>
                <span>{subtotal.toLocaleString()} DA</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>Taxe de séjour</span>
                <span>{tax.toLocaleString()} DA</span>
              </div>
              <div className="flex justify-between font-bold text-navy-deep text-[15px] pt-2">
                <span>Total</span>
                <span>{total.toLocaleString()} DA</span>
              </div>
            </div>

            <Link
              to="/reservation"
              className="block text-center bg-gold hover:bg-gold-light text-navy-deep font-bold py-3.5 rounded-lg text-sm mt-4 transition-colors"
            >
              Confirmer la réservation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

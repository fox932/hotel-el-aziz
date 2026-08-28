import { Link } from 'react-router-dom'
import { User, Wifi, BedDouble } from 'lucide-react'

export default function RoomCard({ room }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-bg-light border border-line transition-all hover:-translate-y-1 hover:shadow-[0_24px_48px_-22px_rgba(15,28,56,0.28)]">
      <div className="photo-placeholder h-[200px] relative">
        <span className="absolute bottom-3 left-3.5 bg-gold text-navy-deep text-xs font-bold px-3 py-1.5 rounded-md z-10">
          À partir de {room.price.toLocaleString()} DA / nuit
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg text-navy-deep mb-2.5">{room.name}</h3>
        <ul className="space-y-1.5 mb-4 text-[13px] text-ink-soft">
          <li className="flex items-center gap-2">
            <User size={14} className="text-gold" /> {room.capacity}
          </li>
          <li className="flex items-center gap-2">
            <BedDouble size={14} className="text-gold" /> {room.bed}
          </li>
          <li className="flex items-center gap-2">
            <Wifi size={14} className="text-gold" /> Wi-Fi gratuit
          </li>
        </ul>
        <div className="flex gap-2.5">
          <Link
            to={`/chambres/${room.slug}`}
            className="flex-1 text-center border border-navy text-navy hover:bg-navy hover:text-white text-[13px] font-bold py-2.5 rounded-lg transition-colors"
          >
            Voir la chambre
          </Link>
          <Link
            to="/reservation"
            className="flex-1 text-center bg-gold hover:bg-gold-light text-navy-deep text-[13px] font-bold py-2.5 rounded-lg transition-colors"
          >
            Réserver
          </Link>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { ArrowDownUp } from 'lucide-react'
import RoomCard from '../components/RoomCard.jsx'
import { useRooms } from '../hooks/useRooms.js'

const filters = [
  { key: 'all', label: 'Toutes les chambres' },
  { key: 'small', label: '1-2 personnes' },
  { key: 'big', label: '3-4 personnes' },
]

export default function Rooms() {
  const [active, setActive] = useState('all')
  const { rooms, loading } = useRooms()

  const visible = rooms.filter((r) => {
    if (active === 'all') return true
    if (active === 'small') return r.guests <= 2
    if (active === 'big') return r.guests >= 3
    return true
  })

  return (
    <div>
      <div className="bg-[linear-gradient(140deg,#1C315A,#0F1C38)] pt-28 pb-12 text-center px-6">
        <span className="text-gold-light font-bold text-xs uppercase tracking-widest mb-2 block">Hébergement</span>
        <h1 className="font-display text-white text-4xl mb-3">Nos chambres</h1>
        <p className="text-white/70 text-[15px] max-w-lg mx-auto">
          Cinq types d'hébergement, du confort essentiel à la suite avec salon
          séparé — tous pensés pour votre séjour à Thaniet El Had.
        </p>
      </div>

      <div className="max-w-[1180px] mx-auto px-6 -mt-7 relative z-10 bg-bg-light border border-line rounded-xl p-4 flex flex-wrap gap-3 items-center shadow-[0_20px_44px_-24px_rgba(15,28,56,0.3)]">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={`px-4 py-2 rounded-full text-[13px] font-semibold border transition-colors ${
              active === f.key
                ? 'bg-navy border-navy text-white'
                : 'border-line text-ink-soft hover:border-navy'
            }`}
          >
            {f.label}
          </button>
        ))}
        <div className="ms-auto flex items-center gap-2 text-[13px] text-ink-soft">
          <ArrowDownUp size={14} /> Trier par prix
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 grid md:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-ink-soft col-span-3 text-center">Chargement des chambres…</p>
          ) : (
            visible.map((room) => <RoomCard key={room.slug} room={room} />)
          )}
        </div>
      </section>
    </div>
  )
}

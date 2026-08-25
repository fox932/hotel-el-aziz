import { Calendar, DoorClosed, Search, User, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-navy uppercase tracking-wide mb-2">
        {label}
      </label>
      <div className="flex items-center gap-2 border border-line rounded-lg px-3 py-2.5 text-sm text-ink">
        {icon}
        {children}
      </div>
    </div>
  )
}

export default function BookingSearchBar() {
  const navigate = useNavigate()

  return (
    <div
      id="booking"
      className="max-w-[1180px] mx-auto -mt-[58px] relative z-20 bg-bg-light rounded-2xl p-6 md:p-7 shadow-[0_30px_70px_-24px_rgba(15,28,56,0.4)] border border-gold/25 grid grid-cols-2 md:grid-cols-6 gap-4 items-end"
    >
      <Field label="Check-in" icon={<Calendar size={15} className="text-gold" />}>
        Date
      </Field>
      <Field label="Check-out" icon={<Calendar size={15} className="text-gold" />}>
        Date
      </Field>
      <Field label="Chambres" icon={<DoorClosed size={15} className="text-gold" />}>
        1
      </Field>
      <Field label="Adultes" icon={<User size={15} className="text-gold" />}>
        2
      </Field>
      <Field label="Enfants" icon={<Users size={15} className="text-gold" />}>
        0
      </Field>
      <button
        onClick={() => navigate('/reservation')}
        className="h-[44px] inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-deep font-bold rounded-lg text-sm transition-colors whitespace-nowrap"
      >
        <Search size={16} /> Rechercher
      </button>
    </div>
  )
}

import {
  LayoutDashboard, CalendarCheck2, User, SlidersHorizontal, Bell, FileText,
  LogOut, Calendar, Hash, Check,
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', active: true },
  { icon: CalendarCheck2, label: 'Mes réservations' },
  { icon: User, label: 'Mon profil' },
  { icon: SlidersHorizontal, label: 'Mes préférences' },
  { icon: Bell, label: 'Notifications' },
  { icon: FileText, label: 'Documents' },
]

const history = [
  { room: 'Chambre Double', dates: '28 → 31 août 2026', ref: 'ELAZIZ-004821', status: 'Confirmée', tone: 'green', price: '20 100 DA' },
  { room: 'Suite', dates: '12 → 15 mai 2026', ref: 'ELAZIZ-003190', status: 'Terminée', tone: 'gray', price: '36 000 DA' },
  { room: 'Chambre Familiale', dates: '3 → 5 mars 2026', ref: 'ELAZIZ-002754', status: 'Annulée', tone: 'orange', price: '19 600 DA' },
]

const badgeTone = {
  green: 'bg-[#E7F5EC] text-[#3E8B5C]',
  gray: 'bg-[#EEEEF0] text-[#8A8D93]',
  orange: 'bg-[#FBEEDF] text-[#C97B2A]',
}

export default function Account() {
  return (
    <div className="pt-24 pb-20 bg-bg min-h-screen">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8 grid md:grid-cols-[260px_1fr] gap-7 pt-4">
        <aside>
          <div className="bg-bg-light border border-line rounded-2xl p-6 text-center mb-4">
            <div className="w-16 h-16 rounded-full bg-navy text-gold-light flex items-center justify-center font-bold text-xl mx-auto mb-3">AB</div>
            <h3 className="font-semibold text-navy-deep">Amine Belkacem</h3>
            <p className="text-xs text-ink-soft mt-0.5">amine.b@exemple.com</p>
          </div>
          <nav className="bg-bg-light border border-line rounded-2xl p-3">
            {navItems.map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-medium mb-0.5 ${
                  active ? 'bg-navy text-white' : 'text-ink-soft hover:bg-bg'
                }`}
              >
                <Icon size={17} /> {label}
              </div>
            ))}
            <div className="flex items-center gap-3 px-3.5 pt-4 mt-2 border-t border-line text-sm font-medium text-red-500">
              <LogOut size={17} /> Déconnexion
            </div>
          </nav>
        </aside>

        <main>
          <div className="mb-6">
            <h1 className="font-display text-2xl md:text-[28px] text-navy-deep">Mon compte</h1>
            <p className="text-ink-soft text-sm mt-1">Bienvenue, Amine — voici un aperçu de vos réservations</p>
          </div>

          <div className="bg-gradient-to-br from-navy to-navy-deep rounded-2xl p-7 text-white mb-8 relative overflow-hidden">
            <span className="text-gold-light text-xs font-bold uppercase tracking-wide mb-2.5 block">Prochaine réservation</span>
            <div className="flex justify-between items-end flex-wrap gap-5">
              <div>
                <h2 className="font-display text-2xl mb-2.5">Chambre Double</h2>
                <div className="flex gap-6 flex-wrap text-[13.5px] text-white/80">
                  <div className="flex items-center gap-1.5"><Calendar size={15} className="text-gold-light" /> 28 → 31 août 2026</div>
                  <div className="flex items-center gap-1.5"><Hash size={15} className="text-gold-light" /> ELAZIZ-004821</div>
                </div>
                <span className="inline-flex items-center gap-1.5 bg-white/15 px-3.5 py-1.5 rounded-full text-xs font-bold mt-2.5">
                  <Check size={13} /> Confirmée
                </span>
              </div>
              <div className="flex gap-2.5">
                <button className="bg-white/10 hover:bg-white/20 text-white text-[13px] font-bold px-4 py-2.5 rounded-md">Modifier</button>
                <button className="bg-white/10 hover:bg-white/20 text-white text-[13px] font-bold px-4 py-2.5 rounded-md">Annuler</button>
                <button className="bg-gold hover:bg-gold-light text-navy-deep text-[13px] font-bold px-4 py-2.5 rounded-md">Voir la réservation</button>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-navy-deep mb-4">Mes réservations</h2>
          <div className="bg-bg-light border border-line rounded-2xl overflow-hidden">
            {history.map((h, i) => (
              <div key={h.ref} className={`flex items-center gap-4 px-6 py-4.5 flex-wrap ${i < history.length - 1 ? 'border-b border-line' : ''}`}>
                <div className="photo-placeholder w-16 h-[52px] rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-[160px]">
                  <h4 className="font-semibold text-navy-deep text-sm mb-0.5">{h.room}</h4>
                  <p className="text-xs text-ink-soft">{h.dates} · {h.ref}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-[11.5px] font-bold ${badgeTone[h.tone]}`}>{h.status}</span>
                <div className="font-bold text-navy-deep text-sm w-24 text-right">{h.price}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

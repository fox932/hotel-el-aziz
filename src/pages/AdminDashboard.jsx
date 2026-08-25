import {
  LayoutDashboard, CalendarCheck2, BedDouble, Users, CalendarRange, Tag,
  ConciergeBell, UtensilsCrossed, Image, Star, Settings, Search, Bell, Mail,
  Plus, LogIn, LogOut, DoorOpen, DoorClosed, Wallet, Eye, Pencil, Check, Clock,
  CheckCheck, X,
} from 'lucide-react'
import logo from '../assets/logo.png'

const nav = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: CalendarCheck2, label: 'Réservations' },
  { icon: BedDouble, label: 'Chambres' },
  { icon: Users, label: 'Clients' },
  { icon: CalendarRange, label: 'Disponibilité' },
  { icon: Tag, label: 'Tarifs' },
]
const navEstab = [
  { icon: ConciergeBell, label: 'Services' },
  { icon: UtensilsCrossed, label: 'Restaurant' },
  { icon: Image, label: 'Galerie' },
  { icon: Star, label: 'Avis' },
]

const stats = [
  { icon: CalendarCheck2, tone: 'bg-navy', iconTone: 'text-gold-light', value: '18', label: 'Réservations aujourd\'hui', trend: '+12%' },
  { icon: LogIn, tone: 'bg-[#E7F5EC]', iconTone: 'text-[#3E8B5C]', value: '7', label: 'Arrivées (Check-ins)' },
  { icon: LogOut, tone: 'bg-[#FBEEDF]', iconTone: 'text-[#C97B2A]', value: '5', label: 'Départs (Check-outs)' },
  { icon: DoorOpen, tone: 'bg-[#E7F5EC]', iconTone: 'text-[#3E8B5C]', value: '9', label: 'Chambres disponibles' },
  { icon: DoorClosed, tone: 'bg-[#EEEEF0]', iconTone: 'text-[#8A8D93]', value: '21', label: 'Chambres occupées' },
  { icon: Wallet, tone: 'bg-gold/15', iconTone: 'text-gold', value: '186 400', label: 'Revenu du jour (DA)', trend: '+8%' },
]

const statusBadge = {
  Confirmé: { cls: 'bg-[#E7F5EC] text-[#3E8B5C]', icon: Check },
  'En attente': { cls: 'bg-[#FBEEDF] text-[#C97B2A]', icon: Clock },
  Terminé: { cls: 'bg-[#EEEEF0] text-[#8A8D93]', icon: CheckCheck },
  Annulé: { cls: 'bg-[#FBE9E9] text-[#C24C4C]', icon: X },
}
const payBadge = {
  Payé: 'bg-[#E7F5EC] text-[#3E8B5C]',
  Partiel: 'bg-[#FBEEDF] text-[#C97B2A]',
  Remboursé: 'bg-[#FBE9E9] text-[#C24C4C]',
}

const reservations = [
  { initials: 'AB', name: 'Amine Belkacem', ref: 'ELAZIZ-004821', room: 'Chambre Double', in: '23 août 2026', out: '26 août 2026', status: 'Confirmé', pay: 'Payé' },
  { initials: 'SL', name: 'Sarah Larbi', ref: 'ELAZIZ-004820', room: 'Suite', in: '24 août 2026', out: '27 août 2026', status: 'En attente', pay: 'Partiel' },
  { initials: 'KT', name: 'Karim Tebboune', ref: 'ELAZIZ-004819', room: 'Chambre Familiale', in: '22 août 2026', out: '25 août 2026', status: 'Confirmé', pay: 'Payé' },
  { initials: 'ND', name: 'Nadia Djelloul', ref: 'ELAZIZ-004818', room: 'Chambre Simple', in: '21 août 2026', out: '23 août 2026', status: 'Terminé', pay: 'Payé' },
  { initials: 'YH', name: 'Yacine Haddad', ref: 'ELAZIZ-004817', room: 'Chambre Twin', in: '25 août 2026', out: '28 août 2026', status: 'Annulé', pay: 'Remboursé' },
]

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-bg text-ink text-[14.5px]">
      <aside className="w-[252px] bg-navy-deep text-white flex-shrink-0 flex flex-col h-screen sticky top-0">
        <div className="p-5 flex items-center gap-2.5 border-b border-white/10">
          <img src={logo} alt="Hôtel El Aziz" className="h-10 bg-bg-light rounded-md p-1" />
          <span className="font-display font-bold text-[15px] text-gold-light leading-tight">HÔTEL<br />EL AZIZ</span>
        </div>
        <nav className="flex-1 p-3 overflow-y-auto">
          {nav.map(({ icon: Icon, label, active }) => (
            <div key={label} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 ${active ? 'bg-gold text-navy-deep font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>
              <Icon size={17} /> {label}
            </div>
          ))}
          <div className="text-[11px] uppercase tracking-wide text-white/35 px-3 pt-3.5 pb-2">Établissement</div>
          {navEstab.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 text-white/70 hover:bg-white/5 hover:text-white">
              <Icon size={17} /> {label}
            </div>
          ))}
          <div className="text-[11px] uppercase tracking-wide text-white/35 px-3 pt-3.5 pb-2">Système</div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white">
            <Settings size={17} /> Paramètres
          </div>
        </nav>
        <div className="p-4 border-t border-white/10 flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-full bg-gold text-navy-deep flex items-center justify-center font-bold text-[13px]">RS</div>
          <div className="text-[13px]">Réception<small className="block text-white/45 text-[11.5px]">Admin</small></div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="bg-bg-light border-b border-line px-7 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 bg-bg border border-line rounded-lg px-3.5 py-2 w-80 text-ink-soft text-[13.5px]">
            <Search size={16} /> Rechercher une réservation, un client…
          </div>
          <div className="flex items-center gap-4.5 gap-[18px]">
            <div className="relative text-ink-soft"><Bell size={19} /><span className="absolute -top-0.5 -right-0.5 w-[7px] h-[7px] rounded-full bg-gold" /></div>
            <Mail size={19} className="text-ink-soft" />
            <div className="w-8 h-8 rounded-full bg-gold text-navy-deep flex items-center justify-center font-bold text-xs">RS</div>
          </div>
        </div>

        <div className="p-7">
          <div className="flex items-end justify-between flex-wrap gap-3.5 mb-6.5 mb-7">
            <div>
              <h1 className="font-display text-2xl text-navy-deep font-bold">Vue d'ensemble</h1>
              <p className="text-ink-soft text-[13.5px] mt-1">Dimanche 23 août 2026 — Hôtel El Aziz, Thaniet El Had</p>
            </div>
            <button className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-deep font-bold px-5 py-2.5 rounded-lg text-[13.5px]">
              <Plus size={16} /> Nouvelle réservation
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="bg-bg-light border border-line rounded-xl p-4.5 p-[18px]">
                <div className="flex items-center justify-between mb-3.5">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.tone}`}>
                    <s.icon size={17} className={s.iconTone} />
                  </div>
                  {s.trend && <span className="text-[11.5px] font-bold text-[#3E8B5C]">{s.trend}</span>}
                </div>
                <h3 className="font-display text-2xl text-navy-deep font-extrabold mb-0.5">{s.value}</h3>
                <p className="text-xs text-ink-soft">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-bg-light border border-line rounded-2xl overflow-hidden">
            <div className="px-5.5 px-[22px] py-5 flex items-center justify-between border-b border-line">
              <h2 className="text-[16.5px] font-bold text-navy-deep">Réservations récentes</h2>
              <button className="text-[13px] font-semibold text-gold">Voir tout →</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-[11.5px] uppercase tracking-wide text-ink-soft">
                    <th className="text-right font-bold px-5.5 px-[22px] py-3 border-b border-line">Client</th>
                    <th className="text-right font-bold px-5.5 px-[22px] py-3 border-b border-line">Chambre</th>
                    <th className="text-right font-bold px-5.5 px-[22px] py-3 border-b border-line">Arrivée</th>
                    <th className="text-right font-bold px-5.5 px-[22px] py-3 border-b border-line">Départ</th>
                    <th className="text-right font-bold px-5.5 px-[22px] py-3 border-b border-line">Statut</th>
                    <th className="text-right font-bold px-5.5 px-[22px] py-3 border-b border-line">Paiement</th>
                    <th className="text-right font-bold px-5.5 px-[22px] py-3 border-b border-line">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r, i) => {
                    const st = statusBadge[r.status]
                    return (
                      <tr key={r.ref} className={`hover:bg-bg ${i < reservations.length - 1 ? 'border-b border-line' : ''}`}>
                        <td className="px-[22px] py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-navy text-gold-light flex items-center justify-center text-xs font-bold">{r.initials}</div>
                            <div>
                              <div className="font-semibold text-sm">{r.name}</div>
                              <div className="text-[11.5px] text-ink-soft">{r.ref}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-[22px] py-3.5 text-sm">{r.room}</td>
                        <td className="px-[22px] py-3.5 text-sm">{r.in}</td>
                        <td className="px-[22px] py-3.5 text-sm">{r.out}</td>
                        <td className="px-[22px] py-3.5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${st.cls}`}>
                            <st.icon size={11} /> {r.status}
                          </span>
                        </td>
                        <td className="px-[22px] py-3.5">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${payBadge[r.pay]}`}>{r.pay}</span>
                        </td>
                        <td className="px-[22px] py-3.5">
                          <div className="flex gap-2">
                            <button className="w-[30px] h-[30px] rounded-md border border-line flex items-center justify-center text-ink-soft hover:text-navy hover:bg-bg"><Eye size={14} /></button>
                            <button className="w-[30px] h-[30px] rounded-md border border-line flex items-center justify-center text-ink-soft hover:text-navy hover:bg-bg"><Pencil size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

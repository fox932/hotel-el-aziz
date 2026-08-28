import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, CalendarCheck2, BedDouble, Tag, Settings, LogOut,
} from 'lucide-react'
import logo from '../assets/logo.png'
import { adminLogout, getAdminInfo } from '../lib/adminAuth.js'

const nav = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: CalendarCheck2, label: 'Réservations', path: '/admin/reservations' },
  { icon: BedDouble, label: 'Chambres', path: '/admin/chambres' },
  { icon: Tag, label: 'Offres', path: '/admin/offres' },
]

export default function AdminLayout({ title, subtitle, action, children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const admin = getAdminInfo()
  const initials = (admin?.username || 'AD').slice(0, 2).toUpperCase()

  function handleLogout() {
    adminLogout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-bg text-ink text-[14.5px]">
      <aside className="w-[252px] bg-navy-deep text-white flex-shrink-0 flex flex-col h-screen sticky top-0">
        <div className="p-5 flex items-center gap-2.5 border-b border-white/10">
          <img src={logo} alt="Hôtel El Aziz" className="h-10 bg-bg-light rounded-md p-1" />
          <span className="font-display font-bold text-[15px] text-gold-light leading-tight">HÔTEL<br />EL AZIZ</span>
        </div>
        <nav className="flex-1 p-3 overflow-y-auto">
          {nav.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path
            return (
              <Link
                key={label}
                to={path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition ${
                  active ? 'bg-gold text-navy-deep font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={17} /> {label}
              </Link>
            )
          })}
          <div className="text-[11px] uppercase tracking-wide text-white/35 px-3 pt-3.5 pb-2">Système</div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white cursor-not-allowed opacity-60">
            <Settings size={17} /> Paramètres
          </div>
        </nav>
        <button
          onClick={handleLogout}
          className="p-4 border-t border-white/10 flex items-center gap-2.5 hover:bg-white/5 transition text-left"
        >
          <div className="w-[34px] h-[34px] rounded-full bg-gold text-navy-deep flex items-center justify-center font-bold text-[13px]">{initials}</div>
          <div className="text-[13px] flex-1">
            {admin?.username || 'Admin'}<small className="block text-white/45 text-[11.5px]">Déconnexion</small>
          </div>
          <LogOut size={16} className="text-white/50" />
        </button>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="p-7">
          <div className="flex items-end justify-between flex-wrap gap-3.5 mb-7">
            <div>
              <h1 className="font-display text-2xl text-navy-deep font-bold">{title}</h1>
              {subtitle && <p className="text-ink-soft text-[13.5px] mt-1">{subtitle}</p>}
            </div>
            {action}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

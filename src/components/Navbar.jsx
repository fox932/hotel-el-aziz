import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CalendarCheck, Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'

const navItems = [
  { to: '/', label: 'Accueil' },
  { to: '/chambres', label: 'Chambres' },
  { to: '/galerie', label: 'Galerie' },
  { to: '/compte', label: 'Mon compte' },
]

export default function Navbar({ solidOnly = false }) {
  const [scrolled, setScrolled] = useState(solidOnly)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (solidOnly) return
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [solidOnly])

  const solid = solidOnly || scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-bg-light/95 backdrop-blur shadow-[0_6px_24px_-14px_rgba(15,28,56,0.25)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-8 flex items-center justify-between">
        <Link to="/">
          <img
            src={logo}
            alt="Hôtel El Aziz"
            className={`transition-all duration-300 ${solid ? 'h-10' : 'h-12'}`}
          />
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `border-b pb-1 transition-colors ${
                  solid ? 'text-navy' : 'text-white'
                } ${isActive ? 'border-gold' : 'border-transparent hover:border-gold'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <div
            className={`flex gap-1 text-xs font-bold ${
              solid ? 'text-ink-soft' : 'text-white/85'
            }`}
          >
            <span className="px-1.5 py-0.5 rounded bg-gold text-navy-deep">FR</span>
            <span>|</span>
            <span>AR</span>
            <span>|</span>
            <span>EN</span>
          </div>
          <Link
            to="/reservation"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-deep font-bold px-6 py-2.5 rounded-md text-sm transition-colors"
          >
            <CalendarCheck size={16} /> Réserver maintenant
          </Link>
        </div>

        <button
          className={`md:hidden ${solid ? 'text-navy' : 'text-white'}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-bg-light border-t border-line px-6 py-5 flex flex-col gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="text-navy font-medium"
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/reservation"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 bg-gold text-navy-deep font-bold px-6 py-3 rounded-md text-sm"
          >
            <CalendarCheck size={16} /> Réserver maintenant
          </Link>
        </div>
      )}
    </header>
  )
}

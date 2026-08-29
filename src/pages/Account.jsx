import { useEffect, useState } from 'react'
import {
  LogOut, Calendar, Hash, Check, Clock, CheckCheck, X, Loader2,
  AlertCircle, User, Mail, Phone, Lock, Search,
} from 'lucide-react'
import { apiFetch } from '../lib/api.js'
import {
  isCustomerAuthed, getCustomerInfo, customerLogin, customerRegister,
  customerLogout, customerFetch,
} from '../lib/customerAuth.js'

const statusTone = {
  confirme: { label: 'Confirmée', cls: 'bg-[#E7F5EC] text-[#3E8B5C]', icon: Check },
  en_attente: { label: 'En attente', cls: 'bg-[#FBEEDF] text-[#C97B2A]', icon: Clock },
  termine: { label: 'Terminée', cls: 'bg-[#EEEEF0] text-[#8A8D93]', icon: CheckCheck },
  annule: { label: 'Annulée', cls: 'bg-[#FBE9E9] text-[#C24C4C]', icon: X },
}

function fmtDate(d) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}
function fmtMoney(n) {
  return new Intl.NumberFormat('fr-FR').format(n)
}

function BookingRow({ b }) {
  const st = statusTone[b.status] || statusTone.en_attente
  return (
    <div className="flex items-center gap-4 px-6 py-4.5 flex-wrap border-b border-line last:border-b-0">
      <div className="photo-placeholder w-16 h-[52px] rounded-lg flex-shrink-0" />
      <div className="flex-1 min-w-[160px]">
        <h4 className="font-semibold text-navy-deep text-sm mb-0.5">{b.room_name}</h4>
        <p className="text-xs text-ink-soft">{fmtDate(b.check_in)} → {fmtDate(b.check_out)} · {b.reservation_number}</p>
      </div>
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-bold ${st.cls}`}>
        <st.icon size={11} /> {st.label}
      </span>
      <div className="font-bold text-navy-deep text-sm w-24 text-right">{fmtMoney(b.total_price)} DA</div>
    </div>
  )
}

// --- Vue "non connecté" : login / inscription + suivi par numéro -----------

function GuestView({ onLoggedIn }) {
  const [mode, setMode] = useState('login') // 'login' | 'register' | 'track'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [login, setLoginForm] = useState({ email: '', password: '' })
  const [reg, setReg] = useState({ name: '', email: '', phone: '', password: '' })
  const [trackNumber, setTrackNumber] = useState('')
  const [trackResult, setTrackResult] = useState(null)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const customer = await customerLogin(login.email, login.password)
      onLoggedIn(customer)
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  async function handleRegister(e) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const customer = await customerRegister(reg.name, reg.email, reg.phone, reg.password)
      onLoggedIn(customer)
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  async function handleTrack(e) {
    e.preventDefault()
    setLoading(true); setError(''); setTrackResult(null)
    try {
      const booking = await apiFetch(`/bookings/${trackNumber.trim()}`)
      setTrackResult(booking)
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  return (
    <div className="pt-24 pb-20 bg-bg min-h-screen">
      <div className="max-w-[440px] mx-auto px-6">
        <div className="text-center mb-7">
          <h1 className="font-display text-2xl text-navy-deep">Mon compte</h1>
          <p className="text-ink-soft text-sm mt-1">Connectez-vous ou suivez une réservation</p>
        </div>

        <div className="flex gap-1.5 bg-bg-light border border-line rounded-lg p-1 mb-6">
          {[['login', 'Connexion'], ['register', 'Créer un compte'], ['track', 'Suivre ma réservation']].map(([v, l]) => (
            <button
              key={v}
              onClick={() => { setMode(v); setError(''); setTrackResult(null) }}
              className={`flex-1 text-[12.5px] font-bold py-2 rounded-md ${mode === v ? 'bg-navy text-white' : 'text-ink-soft'}`}
            >
              {l}
            </button>
          ))}
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-[#FBE9E9] text-[#C24C4C] text-[13px] font-medium px-3.5 py-2.5 rounded-lg mb-5">
            <AlertCircle size={16} className="flex-shrink-0" /> {error}
          </div>
        )}

        {mode === 'login' && (
          <form onSubmit={handleLogin} className="bg-bg-light border border-line rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 border border-line rounded-lg px-3.5 py-2.5">
              <Mail size={16} className="text-ink-soft" />
              <input required type="email" placeholder="Email" value={login.email}
                onChange={(e) => setLoginForm({ ...login, email: e.target.value })}
                className="flex-1 outline-none text-sm bg-transparent" />
            </div>
            <div className="flex items-center gap-2.5 border border-line rounded-lg px-3.5 py-2.5">
              <Lock size={16} className="text-ink-soft" />
              <input required type="password" placeholder="Mot de passe" value={login.password}
                onChange={(e) => setLoginForm({ ...login, password: e.target.value })}
                className="flex-1 outline-none text-sm bg-transparent" />
            </div>
            <button disabled={loading} className="w-full bg-gold hover:bg-gold-light disabled:opacity-60 text-navy-deep font-bold py-3 rounded-lg text-sm">
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegister} className="bg-bg-light border border-line rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 border border-line rounded-lg px-3.5 py-2.5">
              <User size={16} className="text-ink-soft" />
              <input required placeholder="Nom complet" value={reg.name}
                onChange={(e) => setReg({ ...reg, name: e.target.value })}
                className="flex-1 outline-none text-sm bg-transparent" />
            </div>
            <div className="flex items-center gap-2.5 border border-line rounded-lg px-3.5 py-2.5">
              <Mail size={16} className="text-ink-soft" />
              <input required type="email" placeholder="Email" value={reg.email}
                onChange={(e) => setReg({ ...reg, email: e.target.value })}
                className="flex-1 outline-none text-sm bg-transparent" />
            </div>
            <div className="flex items-center gap-2.5 border border-line rounded-lg px-3.5 py-2.5">
              <Phone size={16} className="text-ink-soft" />
              <input placeholder="Téléphone (optionnel)" value={reg.phone}
                onChange={(e) => setReg({ ...reg, phone: e.target.value })}
                className="flex-1 outline-none text-sm bg-transparent" />
            </div>
            <div className="flex items-center gap-2.5 border border-line rounded-lg px-3.5 py-2.5">
              <Lock size={16} className="text-ink-soft" />
              <input required type="password" placeholder="Mot de passe" value={reg.password}
                onChange={(e) => setReg({ ...reg, password: e.target.value })}
                className="flex-1 outline-none text-sm bg-transparent" />
            </div>
            <button disabled={loading} className="w-full bg-gold hover:bg-gold-light disabled:opacity-60 text-navy-deep font-bold py-3 rounded-lg text-sm">
              {loading ? 'Création…' : 'Créer mon compte'}
            </button>
          </form>
        )}

        {mode === 'track' && (
          <div>
            <form onSubmit={handleTrack} className="bg-bg-light border border-line rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2.5 border border-line rounded-lg px-3.5 py-2.5">
                <Search size={16} className="text-ink-soft" />
                <input required placeholder="Numéro (ex. ELAZIZ-004821)" value={trackNumber}
                  onChange={(e) => setTrackNumber(e.target.value)}
                  className="flex-1 outline-none text-sm bg-transparent" />
              </div>
              <button disabled={loading} className="w-full bg-gold hover:bg-gold-light disabled:opacity-60 text-navy-deep font-bold py-3 rounded-lg text-sm">
                {loading ? 'Recherche…' : 'Rechercher'}
              </button>
            </form>

            {trackResult && (
              <div className="bg-bg-light border border-line rounded-2xl p-6 mt-4">
                <BookingRow b={trackResult} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// --- Vue "connecté" ----------------------------------------------------

function LoggedInView({ customer, onLogout }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    customerFetch('/bookings/mine')
      .then(setBookings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const next = bookings.find((b) => b.status === 'confirme' || b.status === 'en_attente')
  const initials = (customer?.name || '?').split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div className="pt-24 pb-20 bg-bg min-h-screen">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8 grid md:grid-cols-[260px_1fr] gap-7 pt-4">
        <aside>
          <div className="bg-bg-light border border-line rounded-2xl p-6 text-center mb-4">
            <div className="w-16 h-16 rounded-full bg-navy text-gold-light flex items-center justify-center font-bold text-xl mx-auto mb-3">{initials}</div>
            <h3 className="font-semibold text-navy-deep">{customer?.name}</h3>
            <p className="text-xs text-ink-soft mt-0.5">{customer?.email}</p>
          </div>
          <nav className="bg-bg-light border border-line rounded-2xl p-3">
            <div className="flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-medium bg-navy text-white mb-0.5">
              <Calendar size={17} /> Mes réservations
            </div>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3.5 pt-4 mt-2 border-t border-line text-sm font-medium text-red-500"
            >
              <LogOut size={17} /> Déconnexion
            </button>
          </nav>
        </aside>

        <main>
          <div className="mb-6">
            <h1 className="font-display text-2xl md:text-[28px] text-navy-deep">Mon compte</h1>
            <p className="text-ink-soft text-sm mt-1">Bienvenue, {customer?.name?.split(' ')[0]} — voici un aperçu de vos réservations</p>
          </div>

          {next && (
            <div className="bg-gradient-to-br from-navy to-navy-deep rounded-2xl p-7 text-white mb-8 relative overflow-hidden">
              <span className="text-gold-light text-xs font-bold uppercase tracking-wide mb-2.5 block">Prochaine réservation</span>
              <h2 className="font-display text-2xl mb-2.5">{next.room_name}</h2>
              <div className="flex gap-6 flex-wrap text-[13.5px] text-white/80">
                <div className="flex items-center gap-1.5"><Calendar size={15} className="text-gold-light" /> {fmtDate(next.check_in)} → {fmtDate(next.check_out)}</div>
                <div className="flex items-center gap-1.5"><Hash size={15} className="text-gold-light" /> {next.reservation_number}</div>
              </div>
            </div>
          )}

          <h2 className="text-lg font-semibold text-navy-deep mb-4">Historique</h2>
          <div className="bg-bg-light border border-line rounded-2xl overflow-hidden">
            {loading ? (
              <div className="flex items-center gap-2 text-ink-soft text-sm py-10 justify-center">
                <Loader2 size={18} className="animate-spin" /> Chargement…
              </div>
            ) : error ? (
              <div className="flex items-center gap-2 text-[#C24C4C] text-sm py-8 justify-center">
                <AlertCircle size={16} /> {error}
              </div>
            ) : bookings.length === 0 ? (
              <p className="text-center text-ink-soft text-sm py-10">Aucune réservation pour le moment</p>
            ) : (
              bookings.map((b) => <BookingRow key={b.id} b={b} />)
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default function Account() {
  const [customer, setCustomer] = useState(isCustomerAuthed() ? getCustomerInfo() : null)

  if (!customer) {
    return <GuestView onLoggedIn={setCustomer} />
  }

  return (
    <LoggedInView
      customer={customer}
      onLogout={() => { customerLogout(); setCustomer(null) }}
    />
  )
}

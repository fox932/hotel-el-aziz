import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, User, AlertCircle } from 'lucide-react'
import logo from '../assets/logo.png'
import { adminLogin, isAdminAuthed } from '../lib/adminAuth.js'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAdminAuthed()) {
    navigate('/admin', { replace: true })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await adminLogin(username, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-deep flex items-center justify-center px-4">
      <div className="w-full max-w-[380px]">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Hôtel El Aziz" className="h-16 bg-bg-light rounded-xl p-2 mb-4" />
          <h1 className="font-display text-2xl text-white font-bold">HÔTEL EL AZIZ</h1>
          <p className="text-white/50 text-sm mt-1">Espace administration</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-bg-light rounded-2xl p-7 shadow-xl">
          {error && (
            <div className="flex items-center gap-2 bg-[#FBE9E9] text-[#C24C4C] text-[13px] font-medium px-3.5 py-2.5 rounded-lg mb-5">
              <AlertCircle size={16} className="flex-shrink-0" /> {error}
            </div>
          )}

          <label className="block text-[13px] font-semibold text-navy-deep mb-1.5">Identifiant</label>
          <div className="flex items-center gap-2.5 border border-line rounded-lg px-3.5 py-2.5 mb-4 focus-within:border-gold">
            <User size={16} className="text-ink-soft" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoFocus
              required
              className="flex-1 outline-none text-sm bg-transparent"
            />
          </div>

          <label className="block text-[13px] font-semibold text-navy-deep mb-1.5">Mot de passe</label>
          <div className="flex items-center gap-2.5 border border-line rounded-lg px-3.5 py-2.5 mb-6 focus-within:border-gold">
            <Lock size={16} className="text-ink-soft" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="flex-1 outline-none text-sm bg-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold-light disabled:opacity-60 text-navy-deep font-bold py-3 rounded-lg text-sm transition"
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-white/35 text-xs mt-6">
          Accès réservé au personnel de l'Hôtel El Aziz
        </p>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Check, Clock, CheckCheck, X, Loader2, AlertCircle } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout.jsx'
import { adminFetch } from '../../lib/adminAuth.js'

const statusOptions = [
  { value: 'en_attente', label: 'En attente', icon: Clock, cls: 'bg-[#FBEEDF] text-[#C97B2A]' },
  { value: 'confirme', label: 'Confirmé', icon: Check, cls: 'bg-[#E7F5EC] text-[#3E8B5C]' },
  { value: 'termine', label: 'Terminé', icon: CheckCheck, cls: 'bg-[#EEEEF0] text-[#8A8D93]' },
  { value: 'annule', label: 'Annulé', icon: X, cls: 'bg-[#FBE9E9] text-[#C24C4C]' },
]
const paymentOptions = [
  { value: 'non_paye', label: 'Non payé' },
  { value: 'partiel', label: 'Partiel' },
  { value: 'paye', label: 'Payé' },
  { value: 'rembourse', label: 'Remboursé' },
]

function fmtDate(d) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}
function fmtMoney(n) {
  return new Intl.NumberFormat('fr-FR').format(n)
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savingId, setSavingId] = useState(null)

  function load(status) {
    setLoading(true)
    adminFetch(`/bookings${status ? `?status=${status}` : ''}`)
      .then(setBookings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load(filter) }, [filter])

  async function updateBooking(id, patch) {
    setSavingId(id)
    try {
      const updated = await adminFetch(`/bookings/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      })
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...updated } : b)))
    } catch (err) {
      setError(err.message)
    } finally {
      setSavingId(null)
    }
  }

  return (
    <AdminLayout title="Réservations" subtitle="Gérez le statut et le paiement de chaque réservation">
      <div className="flex gap-2 mb-5 flex-wrap">
        <button
          onClick={() => setFilter('')}
          className={`px-4 py-2 rounded-lg text-[13px] font-bold ${filter === '' ? 'bg-navy text-white' : 'bg-bg-light border border-line text-ink-soft'}`}
        >
          Toutes
        </button>
        {statusOptions.map((s) => (
          <button
            key={s.value}
            onClick={() => setFilter(s.value)}
            className={`px-4 py-2 rounded-lg text-[13px] font-bold ${filter === s.value ? 'bg-navy text-white' : 'bg-bg-light border border-line text-ink-soft'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-[#FBE9E9] text-[#C24C4C] text-sm font-medium px-4 py-3 rounded-lg mb-5">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div className="bg-bg-light border border-line rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center gap-2 text-ink-soft text-sm py-10 justify-center">
            <Loader2 size={18} className="animate-spin" /> Chargement…
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-center text-ink-soft text-sm py-10">Aucune réservation</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-[11.5px] uppercase tracking-wide text-ink-soft">
                  <th className="text-right font-bold px-5 py-3 border-b border-line">Client</th>
                  <th className="text-right font-bold px-5 py-3 border-b border-line">Chambre</th>
                  <th className="text-right font-bold px-5 py-3 border-b border-line">Dates</th>
                  <th className="text-right font-bold px-5 py-3 border-b border-line">Total</th>
                  <th className="text-right font-bold px-5 py-3 border-b border-line">Statut</th>
                  <th className="text-right font-bold px-5 py-3 border-b border-line">Paiement</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((r, i) => (
                  <tr key={r.id} className={`hover:bg-bg ${i < bookings.length - 1 ? 'border-b border-line' : ''} ${savingId === r.id ? 'opacity-50' : ''}`}>
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-sm">{r.guest_name}</div>
                      <div className="text-[11.5px] text-ink-soft">{r.reservation_number} · {r.guest_email}</div>
                    </td>
                    <td className="px-5 py-3.5 text-sm">{r.room_name}</td>
                    <td className="px-5 py-3.5 text-sm whitespace-nowrap">{fmtDate(r.check_in)} → {fmtDate(r.check_out)}</td>
                    <td className="px-5 py-3.5 text-sm font-bold whitespace-nowrap">{fmtMoney(r.total_price)} DA</td>
                    <td className="px-5 py-3.5">
                      <select
                        value={r.status}
                        disabled={savingId === r.id}
                        onChange={(e) => updateBooking(r.id, { status: e.target.value })}
                        className="text-[12.5px] font-bold px-2.5 py-1.5 rounded-lg border border-line bg-white"
                      >
                        {statusOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={r.payment_status}
                        disabled={savingId === r.id}
                        onChange={(e) => updateBooking(r.id, { payment_status: e.target.value })}
                        className="text-[12.5px] font-bold px-2.5 py-1.5 rounded-lg border border-line bg-white"
                      >
                        {paymentOptions.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

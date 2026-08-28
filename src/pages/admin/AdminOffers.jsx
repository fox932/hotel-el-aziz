import { useEffect, useState } from 'react'
import { Plus, Trash2, Loader2, AlertCircle } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout.jsx'
import { adminFetch } from '../../lib/adminAuth.js'

const emptyForm = { title: '', description: '', discount_percent: '', valid_until: '' }

export default function AdminOffers() {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  function load() {
    setLoading(true)
    adminFetch('/offers/all')
      .then(setOffers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function toggleActive(offer) {
    try {
      const updated = await adminFetch(`/offers/${offer.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ active: !offer.active }),
      })
      setOffers((prev) => prev.map((o) => (o.id === offer.id ? updated : o)))
    } catch (err) {
      setError(err.message)
    }
  }

  async function deleteOffer(id) {
    if (!confirm('Supprimer cette offre ?')) return
    try {
      await adminFetch(`/offers/${id}`, { method: 'DELETE' })
      setOffers((prev) => prev.filter((o) => o.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  async function createOffer(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const created = await adminFetch('/offers', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          discount_percent: form.discount_percent ? Number(form.discount_percent) : null,
          valid_until: form.valid_until || null,
        }),
      })
      setOffers((prev) => [created, ...prev])
      setForm(emptyForm)
      setShowForm(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout
      title="Offres"
      subtitle="Créez et gérez les promotions affichées aux clients"
      action={
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-deep font-bold px-5 py-2.5 rounded-lg text-[13.5px]"
        >
          <Plus size={16} /> Nouvelle offre
        </button>
      }
    >
      {error && (
        <div className="flex items-center gap-2 bg-[#FBE9E9] text-[#C24C4C] text-sm font-medium px-4 py-3 rounded-lg mb-5">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={createOffer} className="bg-bg-light border border-line rounded-2xl p-6 mb-6 grid md:grid-cols-3 gap-4">
          <div className="md:col-span-3 font-bold text-navy-deep text-sm mb-1">Ajouter une offre</div>
          <input required placeholder="Titre (ex. Offre été -20%)" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border border-line rounded-lg px-3.5 py-2.5 text-sm md:col-span-2" />
          <input type="number" placeholder="Réduction (%)" value={form.discount_percent}
            onChange={(e) => setForm({ ...form, discount_percent: e.target.value })}
            className="border border-line rounded-lg px-3.5 py-2.5 text-sm" />
          <input type="date" value={form.valid_until}
            onChange={(e) => setForm({ ...form, valid_until: e.target.value })}
            className="border border-line rounded-lg px-3.5 py-2.5 text-sm md:col-span-3" />
          <textarea placeholder="Description" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border border-line rounded-lg px-3.5 py-2.5 text-sm md:col-span-3" rows={2} />
          <div className="md:col-span-3 flex gap-3">
            <button type="submit" disabled={saving} className="bg-navy text-white font-bold px-5 py-2.5 rounded-lg text-[13px] disabled:opacity-60">
              {saving ? 'Enregistrement…' : 'Créer l\'offre'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-ink-soft font-semibold text-[13px]">Annuler</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-ink-soft text-sm py-10 justify-center">
          <Loader2 size={18} className="animate-spin" /> Chargement…
        </div>
      ) : offers.length === 0 ? (
        <p className="text-center text-ink-soft text-sm py-10">Aucune offre pour le moment</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {offers.map((o) => (
            <div key={o.id} className={`bg-bg-light border border-line rounded-2xl p-5 ${!o.active ? 'opacity-50' : ''}`}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display text-lg text-navy-deep font-bold">{o.title}</h3>
                {o.discount_percent && (
                  <span className="bg-gold/15 text-gold font-bold text-xs px-2.5 py-1 rounded-full flex-shrink-0">-{o.discount_percent}%</span>
                )}
              </div>
              {o.description && <p className="text-ink-soft text-[13px] mb-3">{o.description}</p>}
              {o.valid_until && (
                <p className="text-[11.5px] text-ink-soft mb-4">Valable jusqu'au {new Date(o.valid_until).toLocaleDateString('fr-FR')}</p>
              )}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => toggleActive(o)}
                  className={`flex-1 text-[12.5px] font-bold py-2 rounded-lg ${o.active ? 'bg-[#EEEEF0] text-ink-soft' : 'bg-[#E7F5EC] text-[#3E8B5C]'}`}
                >
                  {o.active ? 'Désactiver' : 'Activer'}
                </button>
                <button onClick={() => deleteOffer(o.id)}
                  className="w-9 h-9 rounded-lg border border-line flex items-center justify-center text-[#C24C4C] hover:bg-[#FBE9E9]">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}

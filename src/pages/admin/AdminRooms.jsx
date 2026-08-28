import { useEffect, useState } from 'react'
import { Plus, Trash2, Loader2, AlertCircle, X, Check } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout.jsx'
import { adminFetch } from '../../lib/adminAuth.js'

const emptyForm = { name: '', price: '', total_units: '', capacity_text: '', bed_text: '', guests: '', description: '' }

function fmtMoney(n) {
  return new Intl.NumberFormat('fr-FR').format(n)
}

export default function AdminRooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null) // { id, price, total_units }
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  function load() {
    setLoading(true)
    adminFetch('/rooms')
      .then(setRooms)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  async function saveEdit(id) {
    setSaving(true)
    try {
      const updated = await adminFetch(`/rooms/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ price: Number(editing.price), total_units: Number(editing.total_units) }),
      })
      setRooms((prev) => prev.map((r) => (r.id === id ? updated : r)))
      setEditing(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function deleteRoom(id) {
    if (!confirm('Supprimer cette chambre ? Cette action est irréversible.')) return
    try {
      await adminFetch(`/rooms/${id}`, { method: 'DELETE' })
      setRooms((prev) => prev.filter((r) => r.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  async function createRoom(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const created = await adminFetch('/rooms', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          total_units: Number(form.total_units),
          guests: form.guests ? Number(form.guests) : null,
        }),
      })
      setRooms((prev) => [...prev, created])
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
      title="Chambres"
      subtitle="Modifiez les prix et disponibilités, ajoutez de nouveaux types de chambres"
      action={
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-deep font-bold px-5 py-2.5 rounded-lg text-[13.5px]"
        >
          <Plus size={16} /> Nouvelle chambre
        </button>
      }
    >
      {error && (
        <div className="flex items-center gap-2 bg-[#FBE9E9] text-[#C24C4C] text-sm font-medium px-4 py-3 rounded-lg mb-5">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={createRoom} className="bg-bg-light border border-line rounded-2xl p-6 mb-6 grid md:grid-cols-3 gap-4">
          <div className="md:col-span-3 font-bold text-navy-deep text-sm mb-1">Ajouter une chambre</div>
          <input required placeholder="Nom (ex. Chambre Double)" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-line rounded-lg px-3.5 py-2.5 text-sm" />
          <input required type="number" placeholder="Prix / nuit (DA)" value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border border-line rounded-lg px-3.5 py-2.5 text-sm" />
          <input required type="number" placeholder="Nombre d'unités" value={form.total_units}
            onChange={(e) => setForm({ ...form, total_units: e.target.value })}
            className="border border-line rounded-lg px-3.5 py-2.5 text-sm" />
          <input placeholder="Capacité (ex. 2 adultes)" value={form.capacity_text}
            onChange={(e) => setForm({ ...form, capacity_text: e.target.value })}
            className="border border-line rounded-lg px-3.5 py-2.5 text-sm" />
          <input placeholder="Lit (ex. 1 lit double)" value={form.bed_text}
            onChange={(e) => setForm({ ...form, bed_text: e.target.value })}
            className="border border-line rounded-lg px-3.5 py-2.5 text-sm" />
          <input type="number" placeholder="Nombre de personnes max" value={form.guests}
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
            className="border border-line rounded-lg px-3.5 py-2.5 text-sm" />
          <textarea placeholder="Description" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border border-line rounded-lg px-3.5 py-2.5 text-sm md:col-span-3" rows={2} />
          <div className="md:col-span-3 flex gap-3">
            <button type="submit" disabled={saving} className="bg-navy text-white font-bold px-5 py-2.5 rounded-lg text-[13px] disabled:opacity-60">
              {saving ? 'Enregistrement…' : 'Créer la chambre'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-ink-soft font-semibold text-[13px]">Annuler</button>
          </div>
        </form>
      )}

      <div className="bg-bg-light border border-line rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center gap-2 text-ink-soft text-sm py-10 justify-center">
            <Loader2 size={18} className="animate-spin" /> Chargement…
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-[11.5px] uppercase tracking-wide text-ink-soft">
                  <th className="text-right font-bold px-5 py-3 border-b border-line">Chambre</th>
                  <th className="text-right font-bold px-5 py-3 border-b border-line">Prix / nuit</th>
                  <th className="text-right font-bold px-5 py-3 border-b border-line">Unités totales</th>
                  <th className="text-right font-bold px-5 py-3 border-b border-line">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((r, i) => {
                  const isEditing = editing?.id === r.id
                  return (
                    <tr key={r.id} className={i < rooms.length - 1 ? 'border-b border-line' : ''}>
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-sm">{r.name}</div>
                        <div className="text-[11.5px] text-ink-soft">{r.capacity_text}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editing.price}
                            onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                            className="border border-line rounded-lg px-2.5 py-1.5 text-sm w-28"
                          />
                        ) : (
                          <span className="font-bold text-sm">{fmtMoney(r.price)} DA</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editing.total_units}
                            onChange={(e) => setEditing({ ...editing, total_units: e.target.value })}
                            className="border border-line rounded-lg px-2.5 py-1.5 text-sm w-20"
                          />
                        ) : (
                          <span className="text-sm">{r.total_units}</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-2">
                          {isEditing ? (
                            <>
                              <button onClick={() => saveEdit(r.id)} disabled={saving}
                                className="w-[30px] h-[30px] rounded-md bg-[#3E8B5C] text-white flex items-center justify-center">
                                <Check size={14} />
                              </button>
                              <button onClick={() => setEditing(null)}
                                className="w-[30px] h-[30px] rounded-md border border-line flex items-center justify-center text-ink-soft">
                                <X size={14} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => setEditing({ id: r.id, price: r.price, total_units: r.total_units })}
                                className="px-3 h-[30px] rounded-md border border-line text-[12.5px] font-bold text-navy hover:bg-bg"
                              >
                                Modifier
                              </button>
                              <button onClick={() => deleteRoom(r.id)}
                                className="w-[30px] h-[30px] rounded-md border border-line flex items-center justify-center text-[#C24C4C] hover:bg-[#FBE9E9]">
                                <Trash2 size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

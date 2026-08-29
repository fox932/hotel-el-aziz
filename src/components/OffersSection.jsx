import { useEffect, useState } from 'react'
import { Tag } from 'lucide-react'
import { apiFetch } from '../lib/api.js'

export default function OffersSection() {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch('/offers')
      .then(setOffers)
      .catch(() => setOffers([]))
      .finally(() => setLoading(false))
  }, [])

  // Rien à afficher : pas de section vide qui casse le rythme de la page
  if (loading || offers.length === 0) return null

  return (
    <section className="bg-navy-deep py-24">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-gold-light font-bold text-xs uppercase tracking-widest mb-3 block">Offres du moment</span>
          <h2 className="font-display text-3xl text-white">Nos promotions actuelles</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((o) => (
            <div key={o.id} className="bg-white/5 border border-white/10 rounded-2xl p-7 relative overflow-hidden">
              {o.discount_percent && (
                <span className="absolute top-5 left-5 bg-gold text-navy-deep font-bold text-xs px-3 py-1.5 rounded-full">
                  -{o.discount_percent}%
                </span>
              )}
              <div className="w-11 h-11 rounded-lg bg-gold/15 flex items-center justify-center mb-5 mt-6">
                <Tag size={19} className="text-gold-light" />
              </div>
              <h3 className="font-display text-xl text-white mb-2">{o.title}</h3>
              {o.description && <p className="text-white/70 text-[14px] mb-4">{o.description}</p>}
              {o.valid_until && (
                <p className="text-gold-light text-[12.5px] font-semibold">
                  Valable jusqu'au {new Date(o.valid_until).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react'

const categories = [
  { key: 'all', label: 'Tout' },
  { key: 'rooms', label: 'Chambres' },
  { key: 'hotel', label: 'Hôtel' },
  { key: 'rest', label: 'Restaurant' },
  { key: 'ext', label: 'Extérieur' },
  { key: 'nature', label: 'Nature' },
]

const items = [
  { cat: 'rooms', tag: 'Chambre Double', h: 'h-64', tone: '' },
  { cat: 'hotel', tag: 'Réception', h: 'h-48', tone: '' },
  { cat: 'nature', tag: 'Forêt de cèdres', h: 'h-80', tone: 'nature' },
  { cat: 'rest', tag: 'Restaurant', h: 'h-48', tone: 'warm' },
  { cat: 'rooms', tag: 'Suite', h: 'h-80', tone: '' },
  { cat: 'ext', tag: "Façade de l'hôtel", h: 'h-64', tone: '' },
  { cat: 'hotel', tag: 'Espace commun', h: 'h-80', tone: '' },
  { cat: 'rooms', tag: 'Chambre Familiale', h: 'h-48', tone: '' },
  { cat: 'nature', tag: 'Montagnes de Tissemsilt', h: 'h-48', tone: 'nature' },
  { cat: 'rest', tag: 'Petit-déjeuner', h: 'h-64', tone: 'warm' },
  { cat: 'ext', tag: 'Parking', h: 'h-48', tone: '' },
  { cat: 'rooms', tag: 'Chambre Simple', h: 'h-64', tone: '' },
]

export default function Gallery() {
  const [active, setActive] = useState('all')
  const [lightbox, setLightbox] = useState(null) // index into visible[]

  const visible = items.filter((it) => active === 'all' || it.cat === active)

  const close = () => setLightbox(null)
  const prev = () => setLightbox((i) => (i - 1 + visible.length) % visible.length)
  const next = () => setLightbox((i) => (i + 1) % visible.length)

  return (
    <div className="pt-28 pb-20">
      <div className="bg-[linear-gradient(140deg,#1C315A,#0F1C38)] py-14 text-center px-6 -mt-28 mb-10">
        <span className="text-gold-light font-bold text-xs uppercase tracking-widest mb-2 block">Galerie</span>
        <h1 className="font-display text-white text-4xl mb-2">Hôtel El Aziz en images</h1>
        <p className="text-white/70 text-[15px]">Chambres, espaces communs, restaurant et nature environnante</p>
      </div>

      <div className="flex flex-wrap gap-2.5 justify-center mb-10 px-6">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`px-5 py-2 rounded-full text-[13.5px] font-semibold border transition-colors ${
              active === c.key
                ? 'bg-navy border-navy text-white'
                : 'border-line text-ink-soft hover:border-navy bg-bg-light'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-8 columns-1 sm:columns-2 md:columns-3 gap-4 [&>*]:mb-4">
        {visible.map((it, i) => (
          <div
            key={i}
            onClick={() => setLightbox(i)}
            className={`photo-placeholder ${it.tone} ${it.h} rounded-xl relative cursor-pointer group break-inside-avoid`}
          >
            <span className="absolute bottom-2.5 right-3 z-10 bg-navy-deep/75 text-white text-[11.5px] font-semibold px-2.5 py-1 rounded-md">
              {it.tag}
            </span>
            <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/0 group-hover:bg-navy-deep/35 transition-colors">
              <Expand size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-[#0A101C]/95 z-[200] flex flex-col items-center justify-center"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <button onClick={close} className="absolute top-6 right-8 text-white"><X size={26} /></button>
          <button onClick={prev} className="absolute left-[5%] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
            <ChevronLeft size={20} />
          </button>
          <div className={`photo-placeholder ${visible[lightbox].tone} w-[80vw] max-w-[900px] h-[70vh] max-h-[560px] rounded-xl`} />
          <button onClick={next} className="absolute right-[5%] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
            <ChevronRight size={20} />
          </button>
          <div className="text-white/70 text-sm mt-4">{lightbox + 1} / {visible.length}</div>
        </div>
      )}
    </div>
  )
}

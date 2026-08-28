import { Link } from 'react-router-dom'
import {
  MapPin, Wifi, Car, Bell, Coffee, Thermometer, ConciergeBell,
  Check, Facebook, Instagram, Music2, Map, Phone, Mail, Clock,
} from 'lucide-react'
import BookingSearchBar from '../components/BookingSearchBar.jsx'
import RoomCard from '../components/RoomCard.jsx'
import { useRooms } from '../hooks/useRooms.js'

const services = [
  { icon: Wifi, title: 'Wi-Fi gratuit', text: "Internet disponible dans les espaces de l'hôtel." },
  { icon: Car, title: 'Parking', text: 'Parking pratique pour nos clients.' },
  { icon: Bell, title: 'Réception', text: 'Accueil disponible pour vous accompagner.' },
  { icon: Coffee, title: 'Petit-déjeuner', text: 'Commencez votre journée avec un petit-déjeuner agréable.' },
  { icon: Thermometer, title: 'Climatisation', text: 'Confort thermique dans les chambres.' },
  { icon: ConciergeBell, title: 'Service de chambre', text: 'Un service pensé pour votre confort.' },
]

const reviews = [
  { name: 'Amine B.', loc: 'Alger', text: 'Une excellente expérience, une équipe accueillante et une chambre très confortable.' },
  { name: 'Sarah L.', loc: 'Oran', text: 'Emplacement calme près de la forêt de cèdres, parfait pour se reposer en famille.' },
  { name: 'Karim T.', loc: 'Tiaret', text: 'Personnel très professionnel, petit-déjeuner délicieux, je recommande vivement.' },
]

export default function Home() {
  const { rooms, loading } = useRooms()

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center bg-[linear-gradient(180deg,rgba(15,28,56,.55)0%,rgba(15,28,56,.35)40%,rgba(15,28,56,.85)100%),radial-gradient(ellipse_at_75%_25%,rgba(198,154,69,.18),transparent_55%),linear-gradient(140deg,#223a63_0%,#14233F_55%,#0B1526_100%)] overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 relative pt-16 pb-32 max-w-[640px]">
          <span className="reveal inline-flex items-center gap-2 text-gold-light text-[13px] font-semibold tracking-widest uppercase mb-5">
            <MapPin size={14} /> Thaniet El Had, Tissemsilt — Algérie
          </span>
          <h1 className="reveal text-white font-display font-bold text-4xl md:text-[50px] leading-tight mb-4">
            Votre séjour, entre confort et nature.
          </h1>
          <p className="reveal text-gold-light italic font-display mb-5">Comfort. Nature. Hospitality.</p>
          <p className="reveal text-white/80 text-[16.5px] max-w-[480px] mb-8">
            Bienvenue à l'Hôtel El Aziz, votre destination idéale pour un séjour
            confortable au cœur d'un environnement naturel exceptionnel.
          </p>
          <div className="reveal flex gap-3.5">
            <Link to="/reservation" className="bg-gold hover:bg-gold-light text-navy-deep font-bold px-6 py-3 rounded-md text-sm transition-colors">
              Réserver maintenant
            </Link>
            <a href="#welcome" className="border border-white/65 text-white hover:bg-white/10 px-6 py-3 rounded-md text-sm transition-colors">
              Découvrir l'hôtel
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        <BookingSearchBar />
      </div>

      {/* Welcome */}
      <section id="welcome" className="bg-bg py-24">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 grid md:grid-cols-[.9fr_1.1fr] gap-14 items-center">
          <div className="photo-placeholder nature h-[380px] md:h-[460px] rounded-2xl" />
          <div>
            <span className="text-gold font-bold text-xs uppercase tracking-widest mb-3 block">
              Bienvenue à l'Hôtel El Aziz
            </span>
            <h2 className="font-display text-3xl text-navy-deep mb-4">
              Un séjour pensé pour votre confort
            </h2>
            <p className="text-ink-soft mb-8 text-[15.5px]">
              Situé à Thaniet El Had, aux portes de la forêt de cèdres de
              Tissemsilt, l'Hôtel El Aziz vous accueille dans un cadre calme et
              authentique. Hospitalité algérienne, propreté et attention aux
              détails : chaque séjour est pensé pour vous ressourcer, entre
              montagne et confort moderne.
            </p>
            <div className="grid grid-cols-4 gap-5 mb-8">
              {[['3★', 'Classification'], ['24/7', 'Accueil'], ['Wi-Fi', 'Gratuit'], ['Parking', 'Disponible']].map(([v, l]) => (
                <div key={l}>
                  <h4 className="font-display text-2xl text-navy font-bold">{v}</h4>
                  <p className="text-[12.5px] text-ink-soft mt-1">{l}</p>
                </div>
              ))}
            </div>
            <Link to="/chambres" className="inline-block bg-gold hover:bg-gold-light text-navy-deep font-bold px-6 py-3 rounded-md text-sm transition-colors">
              Découvrir l'hôtel
            </Link>
          </div>
        </div>
      </section>

      {/* Rooms preview */}
      <section id="rooms" className="py-24">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-gold font-bold text-xs uppercase tracking-widest mb-3 block">Hébergement</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy-deep mb-4">Nos chambres</h2>
            <p className="text-ink-soft">Des espaces confortables et soigneusement aménagés pour rendre votre séjour agréable.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {loading ? (
              <p className="text-ink-soft col-span-3 text-center">Chargement des chambres…</p>
            ) : (
              rooms.slice(0, 3).map((room) => <RoomCard key={room.slug} room={room} />)
            )}
          </div>
          <div className="text-center mt-11">
            <Link to="/chambres" className="inline-block border border-navy text-navy hover:bg-navy hover:text-white px-6 py-3 rounded-md text-sm transition-colors">
              Voir toutes les chambres
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-bg py-24">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-gold font-bold text-xs uppercase tracking-widest mb-3 block">Services</span>
            <h2 className="font-display text-3xl text-navy-deep">Tout ce dont vous avez besoin</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-bg-light rounded-xl p-7 border border-line">
                <div className="w-12 h-12 rounded-lg bg-navy flex items-center justify-center mb-4">
                  <Icon size={22} className="text-gold-light" />
                </div>
                <h3 className="font-semibold text-navy-deep mb-2">{title}</h3>
                <p className="text-[13.5px] text-ink-soft">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nature */}
      <section className="relative py-36 text-center overflow-hidden bg-[linear-gradient(180deg,rgba(15,28,56,.7),rgba(15,28,56,.85)),linear-gradient(140deg,#1B3A2C,#0D1C15)]">
        <div className="relative max-w-[680px] mx-auto px-6">
          <span className="text-gold-light font-bold text-xs uppercase tracking-widest mb-3 block">Identité locale</span>
          <h2 className="font-display text-white text-3xl md:text-4xl mb-5">Au cœur de la nature</h2>
          <p className="text-white/80 text-[16px] mb-3">
            Profitez d'un séjour au calme, entouré de paysages naturels et de
            majestueux cèdres qui font partie de l'identité de notre région.
          </p>
          <p className="font-display italic text-gold-light text-lg my-7">Respirez. Explorez. Profitez.</p>
          <a href="#" className="inline-block bg-gold hover:bg-gold-light text-navy-deep font-bold px-6 py-3 rounded-md text-sm transition-colors">
            Découvrir la région
          </a>
        </div>
      </section>

      {/* Restaurant */}
      <section className="py-24">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="photo-placeholder warm h-[320px] md:h-[420px] rounded-2xl" />
          <div>
            <span className="text-gold font-bold text-xs uppercase tracking-widest mb-3 block">Gastronomie</span>
            <h2 className="font-display text-3xl text-navy-deep mb-4">Notre Restaurant</h2>
            <p className="text-ink-soft mb-6 text-[15.5px]">
              Découvrez une cuisine conviviale inspirée des saveurs locales et internationales.
            </p>
            <ul className="space-y-3 mb-8">
              {['Cuisine locale', 'Petit-déjeuner', 'Déjeuner', 'Dîner', 'Espace chaleureux'].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[14.5px]">
                  <Check size={16} className="text-gold" /> {f}
                </li>
              ))}
            </ul>
            <div className="flex gap-3.5">
              <a href="#" className="bg-gold hover:bg-gold-light text-navy-deep font-bold px-6 py-3 rounded-md text-sm transition-colors">
                Découvrir le restaurant
              </a>
              <a href="#" className="border border-navy text-navy hover:bg-navy hover:text-white px-6 py-3 rounded-md text-sm transition-colors">
                Voir le menu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-bg py-24">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-gold font-bold text-xs uppercase tracking-widest mb-3 block">Témoignages</span>
            <h2 className="font-display text-3xl text-navy-deep">Ce que nos clients pensent de nous</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-bg-light rounded-xl p-7 border border-line">
                <div className="text-gold mb-4">★★★★★</div>
                <p className="text-[14.5px] italic mb-5">"{r.text}"</p>
                <div className="font-bold text-sm text-navy-deep">{r.name}</div>
                <div className="text-xs text-ink-soft">{r.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 grid md:grid-cols-[1.1fr_.9fr] gap-14 items-center">
          <div className="h-[300px] md:h-[340px] rounded-2xl bg-[linear-gradient(160deg,#EDE6D6,#DDD2B6)] border border-[#E2D8BF] flex items-center justify-center">
            <Map size={38} className="text-navy" />
          </div>
          <div>
            <span className="text-gold font-bold text-xs uppercase tracking-widest mb-3 block">Localisation</span>
            <h2 className="font-display text-3xl text-navy-deep mb-6">Nous trouver</h2>
            <div className="space-y-4 mb-7">
              <div className="flex gap-3 text-[14.5px]"><MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" /> Thaniet El Had, Wilaya de Tissemsilt, Algérie</div>
              <div className="flex gap-3 text-[14.5px]"><Phone size={18} className="text-gold flex-shrink-0 mt-0.5" /> 0X XX XX XX XX</div>
              <div className="flex gap-3 text-[14.5px]"><Mail size={18} className="text-gold flex-shrink-0 mt-0.5" /> contact@hotelelaziz.dz</div>
              <div className="flex gap-3 text-[14.5px]"><Clock size={18} className="text-gold flex-shrink-0 mt-0.5" /> Réception ouverte 24h/24, 7j/7</div>
            </div>
            <div className="flex gap-3 mb-6">
              <a href="#" className="bg-gold hover:bg-gold-light text-navy-deep font-bold px-6 py-3 rounded-md text-sm transition-colors">Obtenir l'itinéraire</a>
              <a href="#" className="border border-navy text-navy hover:bg-navy hover:text-white px-6 py-3 rounded-md text-sm transition-colors">Nous contacter</a>
            </div>
            <div className="flex gap-3">
              {[Facebook, Instagram, Music2].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-navy flex items-center justify-center">
                  <Icon size={16} className="text-gold-light" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

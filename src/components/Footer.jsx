import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white pt-16 pb-6">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-12">
          <div>
            <img
              src={logo}
              alt="Hôtel El Aziz"
              className="h-12 bg-bg-light rounded-lg p-1.5 mb-4"
            />
            <p className="text-white/70 text-sm leading-relaxed">
              Hôtel 3 étoiles à Thaniet El Had, Wilaya de Tissemsilt. Un séjour
              confortable au cœur de la nature et de la forêt de cèdres.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gold-light text-sm uppercase tracking-wide mb-4">
              Hôtel
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/" className="hover:text-gold-light">À propos</Link></li>
              <li><Link to="/chambres" className="hover:text-gold-light">Chambres</Link></li>
              <li><Link to="/galerie" className="hover:text-gold-light">Galerie</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gold-light text-sm uppercase tracking-wide mb-4">
              Réservation
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/reservation" className="hover:text-gold-light">Réserver</Link></li>
              <li><Link to="/compte" className="hover:text-gold-light">Mes réservations</Link></li>
              <li><a href="#" className="hover:text-gold-light">Conditions</a></li>
              <li><a href="#" className="hover:text-gold-light">Politique d'annulation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gold-light text-sm uppercase tracking-wide mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>Thaniet El Had, Tissemsilt</li>
              <li>0X XX XX XX XX</li>
              <li>contact@hotelelaziz.dz</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/50">
          <span>© 2026 Hôtel El Aziz. Tous droits réservés.</span>
          <span>
            <a href="#" className="hover:text-gold-light">Mentions légales</a> ·{' '}
            <a href="#" className="hover:text-gold-light">Politique de confidentialité</a> ·{' '}
            <a href="#" className="hover:text-gold-light">Conditions générales</a>
          </span>
        </div>
      </div>
    </footer>
  )
}

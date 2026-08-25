# Hôtel El Aziz — Site web (React + Vite + Tailwind)

Frontend uniquement pour l'instant : toutes les pages sont fonctionnelles côté
interface (navigation, filtres, formulaire de réservation multi-étapes,
galerie avec lightbox…) mais les données sont statiques (`src/data/rooms.js`)
— il n'y a pas encore de backend/API réelle.

## Lancer le projet en local

Prérequis : [Node.js](https://nodejs.org) 18+ installé sur votre machine.

```bash
npm install
npm run dev
```

Le site sera accessible sur **http://localhost:5173**.

## Pages disponibles

| Route | Page |
|---|---|
| `/` | Accueil (Hero, Booking bar, Welcome, Chambres, Services, Nature, Restaurant, Avis, Localisation) |
| `/chambres` | Liste des 5 chambres avec filtres |
| `/chambres/:slug` | Fiche détaillée d'une chambre + panneau de réservation |
| `/galerie` | Galerie masonry avec filtres par catégorie + lightbox |
| `/reservation` | Parcours de réservation en 6 étapes |
| `/compte` | Espace client (Mon compte) |
| `/admin` | Tableau de bord administrateur |

## Structure du projet

```
src/
  components/   → Navbar, Footer, BookingSearchBar, RoomCard (réutilisés entre pages)
  pages/        → une page par route ci-dessus
  data/         → rooms.js (données des chambres, à remplacer par l'API plus tard)
  assets/       → logo.png
  App.jsx       → routage (react-router-dom)
  main.jsx      → point d'entrée
```

## Prochaines étapes (backend)

- API Node.js + Express (`/api/rooms`, `/api/bookings`, `/api/offers`, `/api/admin/*`)
- Base de données PostgreSQL
- Authentification JWT (admin + comptes clients)
- Remplacer les données statiques de `src/data/rooms.js` par des appels à l'API
- Système de disponibilité réel dans l'étape 3 du parcours de réservation

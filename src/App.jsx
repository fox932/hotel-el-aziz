import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Rooms from './pages/Rooms.jsx'
import RoomDetails from './pages/RoomDetails.jsx'
import Gallery from './pages/Gallery.jsx'
import Booking from './pages/Booking.jsx'
import Account from './pages/Account.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

// Pages that ship their own header/layout (booking flow, account, admin)
// and should NOT be wrapped in the public Navbar/Footer.
const STANDALONE_PATHS = ['/reservation', '/compte', '/admin']

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  const location = useLocation()
  const isStandalone = STANDALONE_PATHS.some((p) => location.pathname.startsWith(p))

  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chambres" element={<Rooms />} />
      <Route path="/chambres/:slug" element={<RoomDetails />} />
      <Route path="/galerie" element={<Gallery />} />
      <Route path="/reservation" element={<Booking />} />
      <Route path="/compte" element={<Account />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )

  return isStandalone ? routes : <PublicLayout>{routes}</PublicLayout>
}

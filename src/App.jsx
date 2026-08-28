import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Rooms from './pages/Rooms.jsx'
import RoomDetails from './pages/RoomDetails.jsx'
import Gallery from './pages/Gallery.jsx'
import Booking from './pages/Booking.jsx'
import Account from './pages/Account.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminBookings from './pages/admin/AdminBookings.jsx'
import AdminRooms from './pages/admin/AdminRooms.jsx'
import AdminOffers from './pages/admin/AdminOffers.jsx'
import ProtectedAdminRoute from './components/ProtectedAdminRoute.jsx'

// Pages that ship their own header/layout (booking flow, account, admin)
// et ne doivent PAS être enveloppées dans le Navbar/Footer public.
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

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
      <Route path="/admin/reservations" element={<ProtectedAdminRoute><AdminBookings /></ProtectedAdminRoute>} />
      <Route path="/admin/chambres" element={<ProtectedAdminRoute><AdminRooms /></ProtectedAdminRoute>} />
      <Route path="/admin/offres" element={<ProtectedAdminRoute><AdminOffers /></ProtectedAdminRoute>} />
    </Routes>
  )

  return isStandalone ? routes : <PublicLayout>{routes}</PublicLayout>
}

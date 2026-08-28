import { Navigate } from 'react-router-dom'
import { isAdminAuthed } from '../lib/adminAuth.js'

export default function ProtectedAdminRoute({ children }) {
  if (!isAdminAuthed()) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}

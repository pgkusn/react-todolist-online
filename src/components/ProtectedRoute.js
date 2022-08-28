import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../helpers/context'

function ProtectedRoute() {
  const { token } = useAuth()
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute

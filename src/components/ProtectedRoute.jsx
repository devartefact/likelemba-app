import { Navigate } from 'react-router'
import { ROUTES } from '../routes.js'

function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to={ROUTES.LOGIN} replace />

  return children
}

export default ProtectedRoute

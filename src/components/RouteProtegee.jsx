import { Navigate } from 'react-router'

// Protège un écran : sans utilisateur connecté, on renvoie vers la page de connexion.
function RouteProtegee({ utilisateur, children }) {
  if (!utilisateur) return <Navigate to="/connexion" replace />
  return children
}

export default RouteProtegee

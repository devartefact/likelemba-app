import { Link } from 'react-router'

// Barre en haut de l'application : le nom du site, l'utilisateur et la déconnexion.
function BarreNavigation({ utilisateur, surDeconnexion }) {
  return (
    <nav className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">
          Likelemba
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <span>{utilisateur.nom}</span>
        <button type="button" className="btn btn-ghost btn-sm" onClick={surDeconnexion}>
          Se déconnecter
        </button>
      </div>
    </nav>
  )
}

export default BarreNavigation

import { Link } from 'react-router'
import { ROUTES } from '../routes.js'

function NavBar({ user, onLogOut }) {
  return (
    <nav className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex-1">
        <Link to={ROUTES.HOME} className="text-xl font-bold">
          Likelemba
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <span>{user.name}</span>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onLogOut}>
          Se déconnecter
        </button>
      </div>
    </nav>
  )
}

export default NavBar

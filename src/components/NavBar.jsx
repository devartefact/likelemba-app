import Avatar from './Avatar.jsx'
import Logo from './Logo.jsx'

function NavBar({ user, onLogOut }) {
  return (
    <nav className="flex items-center justify-between gap-4 px-8 pt-6">
      <Logo />
      <div className="flex items-center gap-3">
        <Avatar name={user.name} />
        <span>{user.name}</span>
        <button type="button" className="btn btn-outline btn-sm" onClick={onLogOut}>
          Se déconnecter
        </button>
      </div>
    </nav>
  )
}

export default NavBar

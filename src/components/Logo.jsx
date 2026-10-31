import { Link } from 'react-router'
import { ROUTES } from '../routes.js'

function Logo() {
  return (
    <Link to={ROUTES.HOME} className="inline-block rounded-full border border-base-content/50 px-5 py-2 text-xl font-light">
      Likelemba
    </Link>
  )
}

export default Logo

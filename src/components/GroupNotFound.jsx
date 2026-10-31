import { Link } from 'react-router'
import { ROUTES } from '../routes.js'

function GroupNotFound() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-light">Groupe introuvable</h1>
      <p className="my-4">Ce groupe n'existe pas ou ne fait pas partie de tes groupes.</p>
      <Link to={ROUTES.HOME} className="btn btn-primary">
        Retour à mes groupes
      </Link>
    </main>
  )
}

export default GroupNotFound

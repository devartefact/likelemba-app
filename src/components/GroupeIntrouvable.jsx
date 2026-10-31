import { Link } from 'react-router'

// Message affiché si le groupe n'existe pas ou appartient à un autre compte.
function GroupeIntrouvable() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Groupe introuvable</h1>
      <p className="my-4">Ce groupe n'existe pas ou ne fait pas partie de tes groupes.</p>
      <Link to="/" className="btn btn-primary">
        Retour à mes groupes
      </Link>
    </main>
  )
}

export default GroupeIntrouvable

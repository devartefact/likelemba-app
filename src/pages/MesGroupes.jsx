import { Link } from 'react-router'
import CarteGroupe from '../components/CarteGroupe.jsx'
import { listerGroupes } from '../services/groupes.js'

// Écran d'accueil après la connexion : la liste des groupes de l'utilisateur.
function MesGroupes({ utilisateur }) {
  const groupes = listerGroupes(utilisateur.id)

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Mes groupes</h1>
        <Link to="/groupes/nouveau" className="btn btn-primary">
          Nouveau groupe
        </Link>
      </div>

      {groupes.length === 0 ? (
        <p>Tu n'as pas encore de groupe. Crée le premier pour commencer.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {groupes.map((groupe) => (
            <CarteGroupe key={groupe.id} groupe={groupe} />
          ))}
        </div>
      )}
    </main>
  )
}

export default MesGroupes

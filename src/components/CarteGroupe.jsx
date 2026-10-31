import { Link } from 'react-router'
import { FREQUENCES, formaterDate, formaterMontant } from '../utils/format.js'
import BadgeStatut from './BadgeStatut.jsx'

// Un groupe dans la liste « Mes groupes ». Toute la carte est un lien vers le groupe.
function CarteGroupe({ groupe }) {
  return (
    <Link to={`/groupes/${groupe.id}`} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
      <div className="card-body">
        <div className="flex items-start justify-between gap-2">
          <h2 className="card-title">{groupe.nom}</h2>
          <BadgeStatut statut={groupe.statut} />
        </div>
        <p className="font-semibold">{formaterMontant(groupe.montant, groupe.devise)}</p>
        <p>{FREQUENCES[groupe.frequence]}, à partir du {formaterDate(groupe.dateDebut)}</p>
        <p>{groupe.membres.length} membre{groupe.membres.length > 1 ? 's' : ''}</p>
      </div>
    </Link>
  )
}

export default CarteGroupe

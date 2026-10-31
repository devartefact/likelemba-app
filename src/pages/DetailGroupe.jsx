import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import BadgeStatut from '../components/BadgeStatut.jsx'
import GroupeIntrouvable from '../components/GroupeIntrouvable.jsx'
import ModaleConfirmation from '../components/ModaleConfirmation.jsx'
import { lireGroupe, supprimerGroupe } from '../services/groupes.js'
import { FREQUENCES, formaterDate, formaterMontant } from '../utils/format.js'

// Écran d'un groupe : ses informations et ses membres.
function DetailGroupe({ utilisateur }) {
  const { id } = useParams()
  const naviguer = useNavigate()
  const [confirmerSuppression, setConfirmerSuppression] = useState(false)
  const groupe = lireGroupe(id, utilisateur.id)

  if (!groupe) return <GroupeIntrouvable />

  function supprimer() {
    supprimerGroupe(id, utilisateur.id)
    naviguer('/')
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <Link to="/" className="link link-primary">
        Retour à mes groupes
      </Link>

      <div className="flex items-center justify-between gap-4 my-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{groupe.nom}</h1>
          <BadgeStatut statut={groupe.statut} />
        </div>
        <div className="flex gap-2">
          {groupe.statut === 'preparation' && (
            <Link to={`/groupes/${id}/modifier`} className="btn">
              Modifier
            </Link>
          )}
          <button type="button" className="btn btn-error" onClick={() => setConfirmerSuppression(true)}>
            Supprimer
          </button>
        </div>
      </div>

      <section className="card bg-base-100 shadow-md card-body mb-4">
        <p><span className="font-semibold">Cotisation :</span> {formaterMontant(groupe.montant, groupe.devise)}</p>
        <p><span className="font-semibold">Fréquence :</span> {FREQUENCES[groupe.frequence]}</p>
        <p><span className="font-semibold">Date de début :</span> {formaterDate(groupe.dateDebut)}</p>
      </section>

      <section className="card bg-base-100 shadow-md card-body">
        <h2 className="card-title">Membres ({groupe.membres.length})</h2>
        <ul className="list-disc list-inside">
          {groupe.membres.map((membre) => (
            <li key={membre.id}>{membre.nom}</li>
          ))}
        </ul>
      </section>

      {confirmerSuppression && (
        <ModaleConfirmation
          titre="Supprimer ce groupe ?"
          message={`Le groupe « ${groupe.nom} », ses membres et ses tours seront supprimés définitivement.`}
          libelleConfirmer="Supprimer"
          classeConfirmer="btn-error"
          surConfirmer={supprimer}
          surAnnuler={() => setConfirmerSuppression(false)}
        />
      )}
    </main>
  )
}

export default DetailGroupe

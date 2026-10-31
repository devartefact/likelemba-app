import { Navigate, useNavigate, useParams } from 'react-router'
import FormulaireGroupe from '../components/FormulaireGroupe.jsx'
import GroupeIntrouvable from '../components/GroupeIntrouvable.jsx'
import { lireGroupe, modifierGroupe } from '../services/groupes.js'

// Écran de modification d'un groupe, tant qu'il n'a pas démarré.
function ModifierGroupe({ utilisateur }) {
  const { id } = useParams()
  const naviguer = useNavigate()
  const groupe = lireGroupe(id, utilisateur.id)

  if (!groupe) return <GroupeIntrouvable />

  // Un groupe démarré ne se modifie plus : on revient à sa page
  if (groupe.statut !== 'preparation') return <Navigate to={`/groupes/${id}`} replace />

  function enregistrer(donnees) {
    modifierGroupe(id, utilisateur.id, donnees)
    naviguer(`/groupes/${id}`)
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Modifier le groupe</h1>
      <FormulaireGroupe groupe={groupe} libelleBouton="Enregistrer" lienAnnuler={`/groupes/${id}`} surEnregistrement={enregistrer} />
    </main>
  )
}

export default ModifierGroupe

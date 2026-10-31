import { useNavigate } from 'react-router'
import FormulaireGroupe from '../components/FormulaireGroupe.jsx'
import { creerGroupe } from '../services/groupes.js'

// Écran de création d'un groupe.
function NouveauGroupe({ utilisateur }) {
  const naviguer = useNavigate()

  function enregistrer(donnees) {
    const groupe = creerGroupe(utilisateur, donnees)

    naviguer(`/groupes/${groupe.id}`)
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Nouveau groupe</h1>
      <FormulaireGroupe libelleBouton="Créer le groupe" lienAnnuler="/" surEnregistrement={enregistrer} />
    </main>
  )
}

export default NouveauGroupe

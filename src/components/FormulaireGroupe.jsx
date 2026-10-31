import { useState } from 'react'
import { Link } from 'react-router'
import { DEVISES, FREQUENCES } from '../utils/format.js'
import ChampFormulaire from './ChampFormulaire.jsx'
import ChampSelection from './ChampSelection.jsx'

const OPTIONS_DEVISE = DEVISES.map((devise) => ({ valeur: devise, libelle: devise }))
const OPTIONS_FREQUENCE = Object.entries(FREQUENCES).map(([valeur, libelle]) => ({ valeur, libelle }))

// Vérifie les champs et renvoie un message d'erreur par champ à corriger.
function validerFormulaire({ nom, montant, dateDebut }) {
  const erreurs = {}
  const montantNombre = Number(montant)

  if (!nom.trim()) erreurs.nom = 'Saisis le nom du groupe.'

  if (!montant) erreurs.montant = 'Saisis le montant de la cotisation.'
  else if (!Number.isSafeInteger(montantNombre) || montantNombre <= 0) {
    erreurs.montant = 'Le montant doit être un nombre entier supérieur à 0.'
  }

  if (!dateDebut) erreurs.dateDebut = 'Choisis la date de début.'

  return erreurs
}

// Formulaire d'un groupe : il sert à la création et à la modification.
function FormulaireGroupe({ groupe, libelleBouton, lienAnnuler, surEnregistrement }) {
  // En modification, les champs partent des valeurs du groupe
  const [nom, setNom] = useState(groupe?.nom ?? '')
  const [montant, setMontant] = useState(groupe ? String(groupe.montant) : '')
  const [devise, setDevise] = useState(groupe?.devise ?? 'CDF')
  const [frequence, setFrequence] = useState(groupe?.frequence ?? 'mois')
  const [dateDebut, setDateDebut] = useState(groupe?.dateDebut ?? '')
  const [erreurs, setErreurs] = useState({})

  function envoyerFormulaire(evenement) {
    // Empêche le navigateur de recharger la page à l'envoi du formulaire
    evenement.preventDefault()

    const nouvellesErreurs = validerFormulaire({ nom, montant, dateDebut })

    setErreurs(nouvellesErreurs)

    if (Object.keys(nouvellesErreurs).length > 0) return

    try {
      surEnregistrement({ nom: nom.trim(), montant: Number(montant), devise, frequence, dateDebut })
    } catch (erreur) {
      setErreurs({ general: erreur.message })
    }
  }

  return (
    <form className="card bg-base-100 shadow-md card-body" onSubmit={envoyerFormulaire} noValidate>
      {erreurs.general && (
        <div role="alert" className="alert alert-error">
          {erreurs.general}
        </div>
      )}

      <ChampFormulaire libelle="Nom du groupe" valeur={nom} surChangement={setNom} erreur={erreurs.nom} autoComplete="off" />
      <ChampFormulaire libelle="Montant de la cotisation" type="number" valeur={montant} surChangement={setMontant} erreur={erreurs.montant} autoComplete="off" />
      <ChampSelection libelle="Devise" valeur={devise} surChangement={setDevise} options={OPTIONS_DEVISE} />
      <ChampSelection libelle="Fréquence" valeur={frequence} surChangement={setFrequence} options={OPTIONS_FREQUENCE} />
      <ChampFormulaire libelle="Date de début" type="date" valeur={dateDebut} surChangement={setDateDebut} erreur={erreurs.dateDebut} autoComplete="off" />

      <div className="flex justify-end gap-2 mt-4">
        <Link to={lienAnnuler} className="btn btn-ghost">
          Annuler
        </Link>
        <button type="submit" className="btn btn-primary">
          {libelleBouton}
        </button>
      </div>
    </form>
  )
}

export default FormulaireGroupe

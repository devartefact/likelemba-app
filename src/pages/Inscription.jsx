import { useState } from 'react'
import { Link } from 'react-router'
import ChampFormulaire from '../components/ChampFormulaire.jsx'
import { inscrire } from '../services/auth.js'

// Vérifie les champs et renvoie un message d'erreur par champ à corriger.
function validerFormulaire({ nom, email, motDePasse, confirmation }) {
  const erreurs = {}

  if (!nom.trim()) erreurs.nom = 'Saisis ton nom.'

  if (!email.trim()) erreurs.email = 'Saisis ton adresse e-mail.'
  else if (!/^\S+@\S+\.\S+$/.test(email.trim())) erreurs.email = "Cette adresse e-mail n'est pas valide."

  if (!motDePasse) erreurs.motDePasse = 'Saisis un mot de passe.'
  else if (motDePasse.length < 6) erreurs.motDePasse = 'Le mot de passe doit contenir au moins 6 caractères.'

  if (!confirmation) erreurs.confirmation = 'Confirme ton mot de passe.'
  else if (confirmation !== motDePasse) erreurs.confirmation = 'Les deux mots de passe ne sont pas identiques.'

  return erreurs
}

// Écran de création de compte.
function Inscription({ surConnexion }) {
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [erreurs, setErreurs] = useState({})
  const [enCours, setEnCours] = useState(false)

  async function envoyerFormulaire(evenement) {
    // Empêche le navigateur de recharger la page à l'envoi du formulaire
    evenement.preventDefault()

    const nouvellesErreurs = validerFormulaire({ nom, email, motDePasse, confirmation })
    setErreurs(nouvellesErreurs)
    if (Object.keys(nouvellesErreurs).length > 0) return

    setEnCours(true)
    try {
      surConnexion(await inscrire({ nom, email, motDePasse }))
    } catch (erreur) {
      setErreurs({ general: erreur.message })
      setEnCours(false)
    }
  }

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-md w-full max-w-md">
        <form className="card-body" onSubmit={envoyerFormulaire} noValidate>
          <h1 className="card-title text-2xl">Créer un compte</h1>

          {erreurs.general && (
            <div role="alert" className="alert alert-error">
              {erreurs.general}
            </div>
          )}

          <ChampFormulaire libelle="Nom" valeur={nom} surChangement={setNom} erreur={erreurs.nom} autoComplete="name" />
          <ChampFormulaire libelle="Adresse e-mail" type="email" valeur={email} surChangement={setEmail} erreur={erreurs.email} autoComplete="email" />
          <ChampFormulaire libelle="Mot de passe (6 caractères minimum)" type="password" valeur={motDePasse} surChangement={setMotDePasse} erreur={erreurs.motDePasse} autoComplete="new-password" />
          <ChampFormulaire libelle="Confirmer le mot de passe" type="password" valeur={confirmation} surChangement={setConfirmation} erreur={erreurs.confirmation} autoComplete="new-password" />

          <button type="submit" className="btn btn-primary mt-4" disabled={enCours}>
            Créer mon compte
          </button>

          <p className="text-center text-sm mt-2">
            Déjà un compte ?{' '}
            <Link to="/connexion" className="link link-primary">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Inscription

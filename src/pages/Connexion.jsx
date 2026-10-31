import { useState } from 'react'
import { Link } from 'react-router'
import ChampFormulaire from '../components/ChampFormulaire.jsx'
import { connecter } from '../services/auth.js'

// Écran de connexion.
function Connexion({ surConnexion }) {
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreurs, setErreurs] = useState({})
  const [enCours, setEnCours] = useState(false)

  async function envoyerFormulaire(evenement) {
    // Empêche le navigateur de recharger la page à l'envoi du formulaire
    evenement.preventDefault()

    const nouvellesErreurs = {}
    if (!email.trim()) nouvellesErreurs.email = 'Saisis ton adresse e-mail.'
    if (!motDePasse) nouvellesErreurs.motDePasse = 'Saisis ton mot de passe.'
    setErreurs(nouvellesErreurs)
    if (Object.keys(nouvellesErreurs).length > 0) return

    setEnCours(true)
    try {
      surConnexion(await connecter({ email, motDePasse }))
    } catch (erreur) {
      setErreurs({ general: erreur.message })
      setEnCours(false)
    }
  }

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-md w-full max-w-md">
        <form className="card-body" onSubmit={envoyerFormulaire} noValidate>
          <h1 className="card-title text-2xl">Se connecter</h1>

          {erreurs.general && (
            <div role="alert" className="alert alert-error">
              {erreurs.general}
            </div>
          )}

          <ChampFormulaire libelle="Adresse e-mail" type="email" valeur={email} surChangement={setEmail} erreur={erreurs.email} autoComplete="email" />
          <ChampFormulaire libelle="Mot de passe" type="password" valeur={motDePasse} surChangement={setMotDePasse} erreur={erreurs.motDePasse} autoComplete="current-password" />

          <button type="submit" className="btn btn-primary mt-4" disabled={enCours}>
            Se connecter
          </button>

          <p className="text-center text-sm mt-2">
            Pas encore de compte ?{' '}
            <Link to="/inscription" className="link link-primary">
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Connexion

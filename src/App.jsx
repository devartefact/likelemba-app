import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import BarreNavigation from './components/BarreNavigation.jsx'
import RouteProtegee from './components/RouteProtegee.jsx'
import Connexion from './pages/Connexion.jsx'
import DetailGroupe from './pages/DetailGroupe.jsx'
import Inscription from './pages/Inscription.jsx'
import MesGroupes from './pages/MesGroupes.jsx'
import ModifierGroupe from './pages/ModifierGroupe.jsx'
import NouveauGroupe from './pages/NouveauGroupe.jsx'
import { deconnecter, lireUtilisateurConnecte } from './services/auth.js'

function App() {
  // L'utilisateur connecté, relu dans localStorage quand la page se charge
  const [utilisateur, setUtilisateur] = useState(lireUtilisateurConnecte)

  function seDeconnecter() {
    deconnecter()
    setUtilisateur(null)
  }

  // Une personne déjà connectée n'a rien à faire sur ces deux écrans
  const accueilSiConnecte = (ecran) => (utilisateur ? <Navigate to="/" replace /> : ecran)

  // Ces écrans demandent d'être connecté
  const protege = (ecran) => <RouteProtegee utilisateur={utilisateur}>{ecran}</RouteProtegee>

  return (
    <>
      {utilisateur && <BarreNavigation utilisateur={utilisateur} surDeconnexion={seDeconnecter} />}

      {/* Liste des écrans de l'application : à chaque adresse correspond une page */}
      <Routes>
        <Route path="/connexion" element={accueilSiConnecte(<Connexion surConnexion={setUtilisateur} />)} />
        <Route path="/inscription" element={accueilSiConnecte(<Inscription surConnexion={setUtilisateur} />)} />
        <Route path="/" element={protege(<MesGroupes utilisateur={utilisateur} />)} />
        <Route path="/groupes/nouveau" element={protege(<NouveauGroupe utilisateur={utilisateur} />)} />
        <Route path="/groupes/:id" element={protege(<DetailGroupe utilisateur={utilisateur} />)} />
        <Route path="/groupes/:id/modifier" element={protege(<ModifierGroupe utilisateur={utilisateur} />)} />
        {/* Toute adresse inconnue renvoie vers l'accueil */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App

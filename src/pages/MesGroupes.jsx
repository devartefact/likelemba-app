// Écran d'accueil après la connexion. La liste des groupes arrive à l'étape 2.
function MesGroupes({ utilisateur }) {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Bonjour {utilisateur.nom}</h1>
      <p className="mt-2">Tes groupes s'afficheront ici.</p>
    </main>
  )
}

export default MesGroupes

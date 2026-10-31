import { Route, Routes } from 'react-router'

// Page provisoire : elle vérifie que Tailwind, DaisyUI et le routeur fonctionnent
function Accueil() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Likelemba</h1>
      <p>L'installation fonctionne.</p>
      <button type="button" className="btn btn-primary">
        Bouton DaisyUI
      </button>
    </main>
  )
}

// Liste des écrans de l'application : à chaque adresse correspond une page
function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
    </Routes>
  )
}

export default App

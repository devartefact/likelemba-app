import { useEffect, useRef } from 'react'

// Fenêtre qui demande une confirmation avant une action importante.
// À n'afficher que lorsqu'on en a besoin : {afficher && <ModaleConfirmation ... />}
function ModaleConfirmation({ titre, message, libelleConfirmer, classeConfirmer = 'btn-primary', surConfirmer, surAnnuler }) {
  const fenetre = useRef(null)

  // showModal bloque le reste de la page et permet de fermer avec la touche Échap
  useEffect(() => {
    const element = fenetre.current

    element.showModal()

    return () => element.close()
  }, [])

  return (
    <dialog ref={fenetre} className="modal" onCancel={surAnnuler}>
      <div className="modal-box">
        <h2 className="text-lg font-bold">{titre}</h2>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={surAnnuler}>
            Annuler
          </button>
          <button type="button" className={`btn ${classeConfirmer}`} onClick={surConfirmer}>
            {libelleConfirmer}
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default ModaleConfirmation

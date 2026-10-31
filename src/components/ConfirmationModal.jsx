import { useEffect, useRef } from 'react'

// Render it only when needed: {isOpen && <ConfirmationModal ... />}
function ConfirmationModal({ title, message, confirmLabel, confirmClassName = 'btn-primary', onConfirm, onCancel }) {
  const dialogRef = useRef(null)

  // showModal blocks the rest of the page and lets the Escape key close the dialog.
  useEffect(() => {
    const dialog = dialogRef.current

    dialog.showModal()

    return () => dialog.close()
  }, [])

  return (
    <dialog ref={dialogRef} className="modal" onCancel={onCancel}>
      <div className="modal-box">
        <h2 className="text-2xl font-light">{title}</h2>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Annuler
          </button>
          <button type="button" className={`btn ${confirmClassName}`} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default ConfirmationModal

import { useState } from 'react'
import { MIN_MEMBERS_TO_START } from '../constants.js'
import { useSafeAction } from '../hooks/useSafeAction.js'
import { startGroup } from '../services/groups.js'
import ConfirmationModal from './ConfirmationModal.jsx'
import ErrorAlert from './ErrorAlert.jsx'

function StartGroupPanel({ group, userId, onGroupChange }) {
  const [isConfirmingStart, setIsConfirmingStart] = useState(false)
  const { actionError, runSafely } = useSafeAction()
  const memberCount = group.members.length
  const canStart = memberCount >= MIN_MEMBERS_TO_START

  function confirmStart() {
    setIsConfirmingStart(false)
    runSafely(() => onGroupChange(startGroup(group.id, userId)))
  }

  return (
    <section className="surface-card card card-body">
      <ErrorAlert message={actionError} />

      <div className="flex items-center justify-between gap-4">
        <p>
          {canStart
            ? 'Une fois démarré, la liste des membres et l’ordre de passage ne pourront plus changer.'
            : `Ajoute au moins ${MIN_MEMBERS_TO_START} membres pour démarrer.`}
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsConfirmingStart(true)}
          disabled={!canStart}
        >
          Démarrer
        </button>
      </div>

      {isConfirmingStart && (
        <ConfirmationModal
          title="Démarrer la likelemba ?"
          message={`Le cycle comptera ${memberCount} tours. La liste des membres et l’ordre de passage ne pourront plus changer.`}
          confirmLabel="Démarrer"
          onConfirm={confirmStart}
          onCancel={() => setIsConfirmingStart(false)}
        />
      )}
    </section>
  )
}

export default StartGroupPanel

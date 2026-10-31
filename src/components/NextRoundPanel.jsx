import { useState } from 'react'
import { useSafeAction } from '../hooks/useSafeAction.js'
import { closeCurrentRound } from '../services/rounds.js'
import { formatAmount } from '../utils/format.js'
import { getBeneficiary, getCurrentRound, getPotAmount, getRoundProgress, isLastRound } from '../utils/rounds.js'
import ConfirmationModal from './ConfirmationModal.jsx'
import ErrorAlert from './ErrorAlert.jsx'

function NextRoundPanel({ group, userId, onGroupChange }) {
  const [isConfirming, setIsConfirming] = useState(false)
  const { actionError, runSafely } = useSafeAction()
  const currentRound = getCurrentRound(group)
  const { isFullyPaid } = getRoundProgress(group, currentRound)
  const buttonLabel = isLastRound(group, currentRound) ? 'Clôturer le cycle' : 'Passer au tour suivant'
  const beneficiaryName = getBeneficiary(group, currentRound).name
  const potAmount = formatAmount(getPotAmount(group), group.currency)

  function confirmClosing() {
    setIsConfirming(false)
    runSafely(() => onGroupChange(closeCurrentRound(group.id, userId)))
  }

  return (
    <section className="card bg-base-100 shadow-md card-body mb-4">
      <ErrorAlert message={actionError} />

      <div className="flex items-center justify-between gap-4">
        <p>
          {isFullyPaid
            ? `Tout le monde a payé : ${beneficiaryName} peut recevoir ${potAmount}.`
            : 'Ce bouton sera disponible quand tout le monde aura payé.'}
        </p>
        <button type="button" className="btn btn-primary" onClick={() => setIsConfirming(true)} disabled={!isFullyPaid}>
          {buttonLabel}
        </button>
      </div>

      {isConfirming && (
        <ConfirmationModal
          title={`${buttonLabel} ?`}
          message={`${beneficiaryName} reçoit ${potAmount}. Ce tour sera clôturé et ne pourra plus être modifié.`}
          confirmLabel={buttonLabel}
          onConfirm={confirmClosing}
          onCancel={() => setIsConfirming(false)}
        />
      )}
    </section>
  )
}

export default NextRoundPanel

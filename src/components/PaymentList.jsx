import { useSafeAction } from '../hooks/useSafeAction.js'
import { cancelPayment, recordPayment } from '../services/payments.js'
import { formatAmount } from '../utils/format.js'
import { getCurrentRound, getRoundProgress } from '../utils/rounds.js'
import ErrorAlert from './ErrorAlert.jsx'
import PaymentRow from './PaymentRow.jsx'

function PaymentList({ group, userId, onGroupChange }) {
  const { actionError, runSafely } = useSafeAction()
  const currentRound = getCurrentRound(group)
  const { paidCount, unpaidCount } = getRoundProgress(group, currentRound)

  function togglePayment(memberId) {
    const updatePayment = currentRound.payments[memberId] ? cancelPayment : recordPayment

    runSafely(() => onGroupChange(updatePayment(group.id, userId, memberId)))
  }

  return (
    <section className="surface-card card card-body mb-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="card-title">Cotisations</h2>
        <p className="text-sm grow-0">
          Payé : {paidCount} · Reste à payer : {unpaidCount}
        </p>
      </div>
      <p>Coche chaque membre qui a versé {formatAmount(group.amount, group.currency)}.</p>

      <ErrorAlert message={actionError} />

      <ul className="divide-y divide-base-300">
        {group.members.map((member) => (
          <li key={member.id}>
            <PaymentRow
              member={member}
              paidAt={currentRound.payments[member.id]}
              isBeneficiary={member.id === currentRound.beneficiaryId}
              onToggle={() => togglePayment(member.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PaymentList

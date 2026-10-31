import { formatAmount, formatDate, formatTimestamp } from '../utils/format.js'
import { getBeneficiary, getClosedRounds, getPotAmount } from '../utils/rounds.js'

function RoundHistory({ group }) {
  const closedRounds = getClosedRounds(group)
  const potAmount = formatAmount(getPotAmount(group), group.currency)

  return (
    <section className="surface-card card card-body mb-4">
      <h2 className="card-title">Historique des tours</h2>

      {closedRounds.length === 0 ? (
        <p>Aucun tour terminé pour l'instant.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Tour</th>
              <th>Bénéficiaire</th>
              <th>Montant</th>
              <th>Date prévue</th>
              <th>Clôturé le</th>
            </tr>
          </thead>
          <tbody>
            {closedRounds.map((round) => (
              <tr key={round.number}>
                <td>{round.number}</td>
                <td>{getBeneficiary(group, round).name}</td>
                <td>{potAmount}</td>
                <td>{formatDate(round.dueDate)}</td>
                <td>{formatTimestamp(round.closedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default RoundHistory

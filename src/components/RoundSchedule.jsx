import { formatDate } from '../utils/format.js'
import { getBeneficiary, getCurrentRound } from '../utils/rounds.js'

const NO_PHONE_LABEL = '—'

// The locked order of the cycle, with the current round highlighted.
function RoundSchedule({ group }) {
  const currentRound = getCurrentRound(group)

  return (
    <section className="card bg-base-100 shadow-md card-body">
      <h2 className="card-title">Ordre de passage ({group.members.length} membres)</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Tour</th>
            <th>Bénéficiaire</th>
            <th>Téléphone</th>
            <th>Date prévue</th>
          </tr>
        </thead>
        <tbody>
          {group.rounds.map((round) => {
            const beneficiary = getBeneficiary(group, round)
            const isCurrent = round.number === currentRound?.number

            return (
              <tr key={round.number} className={isCurrent ? 'bg-base-200 font-semibold' : ''}>
                <td>{round.number}</td>
                <td>{beneficiary.name}</td>
                <td>{beneficiary.phone || NO_PHONE_LABEL}</td>
                <td>{formatDate(round.dueDate)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default RoundSchedule

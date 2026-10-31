import { formatDate } from '../utils/format.js'

const NO_PHONE_LABEL = '—'

// The locked order of the cycle, once the group has started.
function RoundSchedule({ group }) {
  const findMember = (memberId) => group.members.find((member) => member.id === memberId)

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
            const beneficiary = findMember(round.beneficiaryId)

            return (
              <tr key={round.number}>
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

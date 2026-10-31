import { formatAmount } from '../utils/format.js'
import { getPotAmount } from '../utils/rounds.js'

function CycleCompleteMessage({ group }) {
  const potAmount = formatAmount(getPotAmount(group), group.currency)

  return (
    <section role="status" className="card card-body mb-4 bg-primary text-primary-content">
      <h2 className="text-3xl font-light">Cycle terminé !</h2>
      <p>
        Chaque membre a reçu la cagnotte de {potAmount}. Les {group.rounds.length} tours sont clôturés.
      </p>
    </section>
  )
}

export default CycleCompleteMessage

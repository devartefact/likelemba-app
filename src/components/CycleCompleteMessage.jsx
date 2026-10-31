import { formatAmount } from '../utils/format.js'
import { getPotAmount } from '../utils/rounds.js'

function CycleCompleteMessage({ group }) {
  const potAmount = formatAmount(getPotAmount(group), group.currency)

  return (
    <section role="status" className="alert alert-success mb-4">
      <div>
        <h2 className="text-lg font-bold">Cycle terminé !</h2>
        <p>
          Chaque membre a reçu la cagnotte de {potAmount}. Les {group.rounds.length} tours sont clôturés.
        </p>
      </div>
    </section>
  )
}

export default CycleCompleteMessage

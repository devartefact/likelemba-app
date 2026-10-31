import { formatAmount, formatDate } from '../utils/format.js'
import { getBeneficiary, getCurrentRound, getPotAmount, getRoundProgress } from '../utils/rounds.js'
import Figure from './Figure.jsx'

function RoundDashboard({ group }) {
  const currentRound = getCurrentRound(group)
  const potAmount = getPotAmount(group)
  const { collectedAmount } = getRoundProgress(group, currentRound)

  return (
    <section className="card card-body mb-4 bg-primary text-primary-content">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-3xl font-light">
          Tour {currentRound.number} sur {group.rounds.length}
        </h2>
        <p className="grow-0">Date prévue : {formatDate(currentRound.dueDate)}</p>
      </div>

      <div className="my-2 grid grid-cols-3 gap-4">
        <Figure label="Bénéficiaire" value={getBeneficiary(group, currentRound).name} />
        <Figure label="Montant attendu" value={formatAmount(potAmount, group.currency)} />
        <Figure label="Déjà collecté" value={formatAmount(collectedAmount, group.currency)} />
      </div>

      <progress
        className="progress progress-neutral progress-hatched w-full"
        value={collectedAmount}
        max={potAmount}
        aria-label="Progression de la collecte"
      />
    </section>
  )
}

export default RoundDashboard

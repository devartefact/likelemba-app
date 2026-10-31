import { formatAmount, formatDate } from '../utils/format.js'
import { getBeneficiary, getCurrentRound, getPotAmount, getRoundProgress } from '../utils/rounds.js'

function RoundFigure({ label, value }) {
  return (
    <div>
      <p className="text-sm">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  )
}

function RoundDashboard({ group }) {
  const currentRound = getCurrentRound(group)
  const potAmount = getPotAmount(group)
  const { collectedAmount } = getRoundProgress(group, currentRound)

  return (
    <section className="card bg-base-100 shadow-md card-body mb-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="card-title text-2xl">
          Tour {currentRound.number} sur {group.rounds.length}
        </h2>
        <p className="grow-0">Date prévue : {formatDate(currentRound.dueDate)}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 my-2">
        <RoundFigure label="Bénéficiaire" value={getBeneficiary(group, currentRound).name} />
        <RoundFigure label="Montant attendu" value={formatAmount(potAmount, group.currency)} />
        <RoundFigure label="Déjà collecté" value={formatAmount(collectedAmount, group.currency)} />
      </div>

      <progress
        className="progress progress-primary w-full"
        value={collectedAmount}
        max={potAmount}
        aria-label="Progression de la collecte"
      />
    </section>
  )
}

export default RoundDashboard

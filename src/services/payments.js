import { getCurrentRound } from '../utils/rounds.js'
import { requireActiveGroup, saveGroup } from './groups.js'

// Only the current round can change: closed rounds are a record of what happened.
function changeCurrentRoundPayments(groupId, userId, getUpdatedPayments) {
  const group = requireActiveGroup(groupId, userId)
  const currentRound = getCurrentRound(group)
  const rounds = group.rounds.map((round) =>
    round.number === currentRound.number ? { ...round, payments: getUpdatedPayments(round.payments) } : round,
  )

  return saveGroup({ ...group, rounds })
}

export function recordPayment(groupId, userId, memberId) {
  return changeCurrentRoundPayments(groupId, userId, (payments) => ({
    ...payments,
    [memberId]: new Date().toISOString(),
  }))
}

export function cancelPayment(groupId, userId, memberId) {
  return changeCurrentRoundPayments(groupId, userId, (payments) =>
    Object.fromEntries(Object.entries(payments).filter(([payerId]) => payerId !== memberId)),
  )
}

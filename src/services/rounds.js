import { GROUP_STATUS } from '../constants.js'
import { getCurrentRound, getRoundProgress, isLastRound, replaceRound } from '../utils/rounds.js'
import { requireActiveGroup, saveGroup } from './groups.js'

// Closing a round moves on to the next one, or ends the cycle after the last round.
export function closeCurrentRound(groupId, userId) {
  const group = requireActiveGroup(groupId, userId)
  const currentRound = getCurrentRound(group)

  if (!getRoundProgress(group, currentRound).isFullyPaid) {
    throw new Error('Tous les membres doivent avoir payé avant de clôturer ce tour.')
  }

  const closedRound = { ...currentRound, closedAt: new Date().toISOString() }

  return saveGroup({
    ...group,
    status: isLastRound(group, currentRound) ? GROUP_STATUS.COMPLETED : GROUP_STATUS.ACTIVE,
    rounds: replaceRound(group.rounds, closedRound),
  })
}

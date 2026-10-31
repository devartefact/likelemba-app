import { FREQUENCY } from '../constants.js'
import { addDays, addMonths, parseIsoDate, toIsoDate } from './dates.js'

const DAYS_PER_WEEK = 7
const DAYS_PER_FORTNIGHT = 14

function calculateDueDate(startDate, frequency, roundIndex) {
  const start = parseIsoDate(startDate)

  if (frequency === FREQUENCY.WEEKLY) return toIsoDate(addDays(start, DAYS_PER_WEEK * roundIndex))
  if (frequency === FREQUENCY.BIWEEKLY) return toIsoDate(addDays(start, DAYS_PER_FORTNIGHT * roundIndex))

  return toIsoDate(addMonths(start, roundIndex))
}

// The current round is the first one that has not been closed yet.
export function getCurrentRound({ rounds }) {
  return rounds.find((round) => round.closedAt === null)
}

export function getClosedRounds({ rounds }) {
  return rounds.filter((round) => round.closedAt !== null)
}

export function isLastRound({ rounds }, round) {
  return round.number === rounds.length
}

export function getBeneficiary({ members }, round) {
  return members.find((member) => member.id === round.beneficiaryId)
}

export function replaceRound(rounds, updatedRound) {
  return rounds.map((round) => (round.number === updatedRound.number ? updatedRound : round))
}

// Every member contributes, the beneficiary included, so the pot counts all of them.
export function getPotAmount({ amount, members }) {
  return amount * members.length
}

export function getRoundProgress(group, round) {
  const memberCount = group.members.length
  const paidCount = group.members.filter((member) => round.payments[member.id]).length

  return {
    paidCount,
    unpaidCount: memberCount - paidCount,
    collectedAmount: group.amount * paidCount,
    isFullyPaid: paidCount === memberCount,
  }
}

// One round per member, in the order of the members list.
export function buildRounds({ members, startDate, frequency }) {
  return members.map((member, index) => ({
    number: index + 1,
    beneficiaryId: member.id,
    dueDate: calculateDueDate(startDate, frequency, index),
    closedAt: null,
    payments: {},
  }))
}

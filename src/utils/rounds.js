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

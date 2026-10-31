import { FREQUENCY, GROUP_STATUS } from '../constants.js'
import { parseIsoDate } from './dates.js'

// Keeps the currency from wrapping alone onto the next line.
const NON_BREAKING_SPACE = String.fromCharCode(160)

export const FREQUENCY_LABELS = {
  [FREQUENCY.WEEKLY]: 'Chaque semaine',
  [FREQUENCY.BIWEEKLY]: 'Chaque quinzaine',
  [FREQUENCY.MONTHLY]: 'Chaque mois',
}

export const STATUS_LABELS = {
  [GROUP_STATUS.SETUP]: 'En préparation',
  [GROUP_STATUS.ACTIVE]: 'En cours',
  [GROUP_STATUS.COMPLETED]: 'Terminé',
}

export function formatAmount(amount, currency) {
  return `${new Intl.NumberFormat('fr-FR').format(amount)}${NON_BREAKING_SPACE}${currency}`
}

export function formatDate(isoDate) {
  return parseIsoDate(isoDate).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatMemberCount(count) {
  return `${count} membre${count > 1 ? 's' : ''}`
}

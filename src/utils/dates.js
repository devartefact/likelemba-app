// Dates are stored as 'YYYY-MM-DD' text. They are always handled in local time:
// parsing that text directly would read it as UTC and could shift the day.
export function parseIsoDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)

  return new Date(year, month - 1, day)
}

export function toIsoDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
}

// Stays on the same day of the month when it exists, otherwise on the last day:
// January 31 plus one month gives the end of February, plus two gives March 31.
export function addMonths(date, months) {
  const firstDayOfTargetMonth = new Date(date.getFullYear(), date.getMonth() + months, 1)
  const year = firstDayOfTargetMonth.getFullYear()
  const month = firstDayOfTargetMonth.getMonth()
  const lastDayOfTargetMonth = new Date(year, month + 1, 0).getDate()

  return new Date(year, month, Math.min(date.getDate(), lastDayOfTargetMonth))
}

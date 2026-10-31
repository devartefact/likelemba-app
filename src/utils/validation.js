import { MIN_PASSWORD_LENGTH } from '../constants.js'

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/

// Each field validator returns an error message, or null when the value is valid.
function requireText(value, message) {
  return value.trim() ? null : message
}

function validateNewEmail(email) {
  if (!email.trim()) return 'Saisis ton adresse e-mail.'
  if (!EMAIL_PATTERN.test(email.trim())) return "Cette adresse e-mail n'est pas valide."

  return null
}

function validateNewPassword(password) {
  if (!password) return 'Saisis un mot de passe.'
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Le mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères.`
  }

  return null
}

function validateConfirmation(confirmation, password) {
  if (!confirmation) return 'Confirme ton mot de passe.'
  if (confirmation !== password) return 'Les deux mots de passe ne sont pas identiques.'

  return null
}

function validateAmount(amount) {
  if (!amount) return 'Saisis le montant de la cotisation.'

  const amountAsNumber = Number(amount)

  if (!Number.isSafeInteger(amountAsNumber) || amountAsNumber <= 0) {
    return 'Le montant doit être un nombre entier supérieur à 0.'
  }

  return null
}

function keepOnlyErrors(fieldResults) {
  return Object.fromEntries(Object.entries(fieldResults).filter(([, message]) => message))
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0
}

export function validateSignUp({ name, email, password, confirmation }) {
  return keepOnlyErrors({
    name: requireText(name, 'Saisis ton nom.'),
    email: validateNewEmail(email),
    password: validateNewPassword(password),
    confirmation: validateConfirmation(confirmation, password),
  })
}

export function validateLogin({ email, password }) {
  return keepOnlyErrors({
    email: requireText(email, 'Saisis ton adresse e-mail.'),
    password: password ? null : 'Saisis ton mot de passe.',
  })
}

export function validateGroup({ name, amount, startDate }) {
  return keepOnlyErrors({
    name: requireText(name, 'Saisis le nom du groupe.'),
    amount: validateAmount(amount),
    startDate: startDate ? null : 'Choisis la date de début.',
  })
}

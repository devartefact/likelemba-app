import { generateSalt, hashPassword } from './password.js'
import { readStoredValue, removeStoredValue, writeStoredValue } from './storage.js'

const USERS_KEY = 'likelemba_users'
const SESSION_KEY = 'likelemba_session'

function readUsers() {
  return readStoredValue(USERS_KEY, [])
}

function openSession(user) {
  writeStoredValue(SESSION_KEY, { userId: user.id })
}

function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

// The salt and the hash must never reach the interface.
function toPublicUser(user) {
  return { id: user.id, name: user.name, email: user.email }
}

export async function signUp({ name, email, password }) {
  const normalizedEmail = normalizeEmail(email)
  const salt = generateSalt()
  const passwordHash = await hashPassword(password, salt)
  const users = readUsers()

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error('Cette adresse e-mail est déjà utilisée.')
  }

  const newUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    salt,
    passwordHash,
  }

  writeStoredValue(USERS_KEY, [...users, newUser])
  openSession(newUser)

  return toPublicUser(newUser)
}

export async function logIn({ email, password }) {
  const normalizedEmail = normalizeEmail(email)
  const user = readUsers().find((account) => account.email === normalizedEmail)
  const passwordHash = user ? await hashPassword(password, user.salt) : null

  // The message never says which field is wrong, so it cannot reveal who has an account.
  if (!user || passwordHash !== user.passwordHash) {
    throw new Error('E-mail ou mot de passe incorrect.')
  }

  openSession(user)

  return toPublicUser(user)
}

export function logOut() {
  removeStoredValue(SESSION_KEY)
}

export function getCurrentUser() {
  const session = readStoredValue(SESSION_KEY, null)

  if (!session) return null

  const user = readUsers().find((account) => account.id === session.userId)

  return user ? toPublicUser(user) : null
}

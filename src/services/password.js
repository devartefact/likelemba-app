const SALT_LENGTH_IN_BYTES = 16

function toHex(bytes) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

// A per-account salt ensures two identical passwords never produce the same hash.
export function generateSalt() {
  return toHex(crypto.getRandomValues(new Uint8Array(SALT_LENGTH_IN_BYTES)))
}

// WARNING: good enough for a workshop, not for a real application.
// SHA-256 is too fast to resist brute force: use a server with bcrypt or Argon2.
export async function hashPassword(password, salt) {
  // crypto.subtle only exists in secure contexts: localhost or HTTPS.
  if (!crypto.subtle) {
    throw new Error("Ouvre l'application sur localhost ou en HTTPS pour gérer les comptes.")
  }

  const bytes = new TextEncoder().encode(salt + password)
  const hash = await crypto.subtle.digest('SHA-256', bytes)

  return toHex(new Uint8Array(hash))
}

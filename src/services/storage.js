// The only file allowed to touch localStorage, which can only hold text.

export function readStoredValue(key, defaultValue) {
  try {
    const storedText = localStorage.getItem(key)

    return storedText === null ? defaultValue : JSON.parse(storedText)
  } catch {
    return defaultValue
  }
}

export function writeStoredValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    throw new Error("Impossible d'enregistrer les données dans ce navigateur.")
  }
}

export function removeStoredValue(key) {
  localStorage.removeItem(key)
}

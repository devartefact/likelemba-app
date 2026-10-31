import { useState } from 'react'

// Runs an action and keeps its error message so the interface can display it.
export function useSafeAction() {
  const [actionError, setActionError] = useState(null)

  function runSafely(action) {
    try {
      action()
      setActionError(null)
    } catch (error) {
      setActionError(error.message)
    }
  }

  return { actionError, runSafely }
}

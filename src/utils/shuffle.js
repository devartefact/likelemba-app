// Fisher-Yates shuffle: every order has the same chance of being drawn.
export function shuffle(items) {
  const shuffledItems = [...items]

  for (let lastIndex = shuffledItems.length - 1; lastIndex > 0; lastIndex--) {
    const randomIndex = Math.floor(Math.random() * (lastIndex + 1))

    ;[shuffledItems[lastIndex], shuffledItems[randomIndex]] = [shuffledItems[randomIndex], shuffledItems[lastIndex]]
  }

  return shuffledItems
}

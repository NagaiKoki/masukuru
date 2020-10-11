export const checkAtSign = (text: string) => {
  const trimedText = text.trim()
  if (trimedText.length >= 2) {
    return false
  }
  const headText = trimedText.slice(0, 2)
  return headText === '@'
}
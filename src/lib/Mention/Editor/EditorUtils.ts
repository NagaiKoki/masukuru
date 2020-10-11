export const checkAtSign = (text: string) => {
  if (text.length >= 2) {
    return false
  }
  const headText = text.slice(0, 2)
  return headText === '@'
}
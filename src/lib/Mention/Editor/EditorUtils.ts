export const checkAtSign = (text: string) => {
  const trimedText = text.trim()
  if (trimedText.length >= 2) {
    return false
  }
  const headText = trimedText.slice(0, 2)
  return headText === '@'
}

export const removeMentionTargetHandler = (targets: { id: string, target: string }[], text: string, removeHandler: (id: string) => void) => {
  targets.forEach(target => {
    const reg = new RegExp(target.target)
    const isMatched = text.match(reg)
    if (!isMatched) {
      return removeHandler(target.id)
    }
  })
}
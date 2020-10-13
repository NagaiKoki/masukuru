export const checkAtSign = (text: string) => {
  const trimedText = text.trim()
  const lastWord = trimedText.slice(trimedText.length - 1)
  if (!trimedText || lastWord !== '@') {
    return false
  }
  return true
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
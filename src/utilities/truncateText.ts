const truncateText = (text: string, maxLength: number = 30): string => {
  if (text.length >= maxLength) {
    return `${text.slice(0, maxLength)}...`
  }
  return text
}

export default truncateText
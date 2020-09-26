// import types
import { EmojiReactionType } from '../../types/Record'

export const reactionCount = (emojiReactionObj: EmojiReactionType) => {
  const mapObj = [
    { index: 1, size: 0 },
    { index: 2, size: 0 },
    { index: 3, size: 0 },
    { index: 4, size: 0 },
    { index: 5, size: 0 }
  ]

  emojiReactionObj.emojiReactions.forEach(reaction => {
    return mapObj[reaction.emojiIndex - 1].size =  mapObj[reaction.emojiIndex - 1].size + 1
  })
  
  return mapObj
}
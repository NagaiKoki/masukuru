import React from 'react'
// import types
import { EmojiReactionType } from '../../../../../types/Record'
// import components
import EmojiCountItem from './Item'
// import utils
import { reactionCount } from '../../../../../utilities/Reaction/reactionCount'

interface PropsType {
  emojiReaction: EmojiReactionType
  recordId: string
}

const EmojiList = (props: PropsType) => {
  const { emojiReaction, recordId } = props
  const countList = reactionCount(emojiReaction)

  const renderEmojiCountList = countList.map(item => {
    return <EmojiCountItem key={item.index} id={item.index} size={item.size} emojiReaction={emojiReaction} recordId={recordId} />
  })

  return (
    <React.Fragment>
      {renderEmojiCountList}
    </React.Fragment>
  )
}

export default EmojiList
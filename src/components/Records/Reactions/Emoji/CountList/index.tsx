import React from 'react'
import styled from 'styled-components'
// import types
import { EmojiReactionType } from '../../../../../types/Record'
// import components
import EmojiCountItem from './Item'
// import utils
import { reactionCount } from '../../../../../utilities/Reaction/reactionCount'

interface PropsType {
  emojiReaction: EmojiReactionType
}

const EmojiList = (props: PropsType) => {
  const { emojiReaction } = props
  const countList = reactionCount(emojiReaction)

  const renderEmojiCountList = countList.map(item => {
    return <EmojiCountItem key={item.index} id={item.index} size={item.size} />
  })

  return (
    <Wrapper>
      {renderEmojiCountList}
    </Wrapper>
  )
}

export default EmojiList

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`
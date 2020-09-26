import React from 'react'
import styled from 'styled-components'
// import components
import EmojiItem from './EmojiItem'
// import utils
import { EMOJI_ITEMS } from '../../../../../utilities/Reaction/Emoji'

const EmojiList = () => {
  const renderEmojiItem =
  EMOJI_ITEMS.map(item => {
    return <EmojiItem id={item.id} emoji={item.emoji} text={item.text} key={item.id} />
  })

  return (
    <Wrapper>
      {renderEmojiItem}
    </Wrapper>
  )
}

export default EmojiList

const Wrapper = styled.View`
  margin-top: 20px;
  padding: 0 20px;
`
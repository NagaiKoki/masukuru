import React from 'react'
import styled from 'styled-components'
// import utils
import { EMOJI_ITEMS } from '../../../../../utilities/Reaction/Emoji'

interface PropsType {
  id: number
  size: number
}

const EmojiItem = (props: PropsType) => {
  const { id, size } = props
  const item = EMOJI_ITEMS.filter(emoji => emoji.id === id)[0]

  if (!size) {
    return null
  }

  return (
    <ItemWrapper>
      <EmojiText>{item.emoji}</EmojiText>
      <CountText>{size}</CountText>
    </ItemWrapper>
  )
}

export default EmojiItem

const ItemWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const EmojiText = styled.Text``

const CountText = styled.Text``
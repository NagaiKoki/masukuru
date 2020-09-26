import React from 'react'
import styled from 'styled-components'
// import utils
import { EMOJI_ITEMS } from '../../../../../utilities/Reaction/Emoji'
// import constants
import { COLORS } from '../../../../../constants/Styles';

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
  border-radius: 8px;
  margin: 5px 10px 5px 0;
  padding: 7px 10px;
  background: ${COLORS.BASE_BACKGROUND2};
`

const EmojiText = styled.Text`
  font-size: 16px;
  margin-right: 5px;
`

const CountText = styled.Text`
  font-size: 15px;
  color: ${COLORS.BASE_BLACK};
`
import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../../../constants/Styles';

interface PropsType {
  emoji: string
  text: string
}

const EmojiItem = (props: PropsType) => {
  const { emoji, text } = props

  return (
    <Wrapper>
      <EmojiBtn>
        <EmojiText>{emoji}</EmojiText>
      </EmojiBtn>
      <EmojiName>{text}</EmojiName>
    </Wrapper>
  )
}

export default EmojiItem

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
`

const EmojiBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background: ${COLORS.BASE_BACKGROUND2};
`

const EmojiText = styled.Text`
  font-size: 30px;
`

const EmojiName = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  font-weight: bold;
`
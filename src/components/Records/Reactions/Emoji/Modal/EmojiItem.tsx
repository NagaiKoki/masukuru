import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { COLORS } from '../../../../../constants/Styles';
// import slices
import {
  requestPostEmojiReaction,
  toggleEmojiModalOpen
} from '../../../../../slice/record'

interface PropsType {
  id: number
  emoji: string
  text: string
}

const EmojiItem = (props: PropsType) => {
  const { id, emoji, text } = props
  const dispatch = useDispatch()

  const handlePostEmojiReaction = () => {
    dispatch(requestPostEmojiReaction({ emojiIndex: id }))
    dispatch(toggleEmojiModalOpen({ isOpen: false }))
  }

  return (
    <Wrapper>
      <EmojiBtn onPress={handlePostEmojiReaction}>
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
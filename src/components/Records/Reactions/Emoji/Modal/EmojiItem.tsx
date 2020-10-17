import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { COLORS } from '../../../../../constants/Styles';
// import slices
import {
  requestPostEmojiReaction,
  toggleEmojiModalOpen
} from '../../../../../slice/record'
import { requestPostEmojiNotification } from '../../../../../slice/notification'
// import utils
import { hapticFeedBack } from '../../../../../utilities/Haptic'
import recordSelector, { selectEmojiReactions } from '../../../../../selectors/record'
// import confing
import firebase from '../../../../../config/firebase' 
import Analytics from '../../../../../config/amplitude'

interface PropsType {
  id: number
  emoji: string
  text: string
}

const EmojiItem = (props: PropsType) => {
  const { id, emoji, text } = props
  const { selectedEmojiRecordId } = recordSelector()
  const reaction = selectEmojiReactions(selectedEmojiRecordId)
  const dispatch = useDispatch()

  const hasPosted = !!reaction && reaction.emojiReactions.some(item => item.emojiIndex === id && item.uid === firebase.auth().currentUser.uid)

  const handlePostEmojiReaction = () => {
    if (hasPosted) return
    hapticFeedBack('medium')
    Analytics.track('emojiReaction', { emojiIndex: id })
    dispatch(requestPostEmojiReaction({ emojiIndex: id }))
    dispatch(requestPostEmojiNotification())
    dispatch(toggleEmojiModalOpen({ isOpen: false }))
  }

  return (
    <Wrapper onPress={handlePostEmojiReaction} activeOpacity={1}>
      <EmojiBtn onPress={handlePostEmojiReaction} hasPosted={hasPosted}>
        <EmojiText>{emoji}</EmojiText>
      </EmojiBtn>
      <EmojiName hasPosted={hasPosted}>{text}</EmojiName>
    </Wrapper>
  )
}

export default EmojiItem

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
`

const EmojiBtn = styled.TouchableOpacity<{ hasPosted: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background: ${COLORS.BASE_BACKGROUND3};
  opacity: ${props => props.hasPosted ? 0.2 : 1};
`

const EmojiText = styled.Text`
  font-size: 30px;
`

const EmojiName = styled.Text<{ hasPosted: boolean }>`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  font-weight: bold;
  opacity: ${props => props.hasPosted ? 0.2 : 1};
`
import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
// import slices 
import { toggleEmojiPostUserModal, requestFetchPostedEmojiUsers } from '../../../../../slice/record'
// import utils
import { EMOJI_ITEMS } from '../../../../../utilities/Reaction/Emoji'
// import constants
import { COLORS } from '../../../../../constants/Styles';
// import types
import { EmojiReactionType } from '../../../../../types/Record';
// import config
import firebase from '../../../../../config/firebase'

interface PropsType {
  id: number
  size: number
  emojiReaction: EmojiReactionType
  recordId: string
}

const EmojiItem = (props: PropsType) => {
  const { id, size, emojiReaction, recordId } = props
  const dispatch = useDispatch()
  const currentUserId = firebase.auth().currentUser.uid
  const item = EMOJI_ITEMS.filter(emoji => emoji.id === id)[0]
  const reactions = emojiReaction.emojiReactions.filter(reaction => {
    return reaction.emojiIndex === id
  })
  const userIds = reactions.map(reaction => reaction.uid)
  const currentUserReaction = reactions.length ? reactions.filter(reaction => reaction.uid === currentUserId)[0] : null
  const emojiId = currentUserReaction ? currentUserReaction.id : ''

  if (!size || !item) {
    return null
  }

  const handleOpenPostedEmojiUserModal = () => {
    dispatch(toggleEmojiPostUserModal({ isOpen: true, emojiIndex: id, selectedRecordId: recordId, selectedEmojiId: emojiId }))
    dispatch(requestFetchPostedEmojiUsers(userIds))
  }

  return (
    <ItemWrapper onPress={handleOpenPostedEmojiUserModal}>
      <EmojiText>{item.emoji}</EmojiText>
      <CountText>{size}</CountText>
    </ItemWrapper>
  )
}

export default EmojiItem

const ItemWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-radius: 20px;
  margin: 5px 10px 5px 0;
  padding: 7px 10px;
  background: ${COLORS.BASE_BACKGROUND3};
`

const EmojiText = styled.Text`
  font-size: 14px;
  margin-right: 5px;
`

const CountText = styled.Text`
  font-size: 14px;
  color: ${COLORS.BASE_BLACK};
`
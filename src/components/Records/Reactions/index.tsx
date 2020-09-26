import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Image } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'
import { COLORS } from '../../../constants/Styles'
// import components
import EmojiCountList from './Emoji/CountList'
// import slices
import { toggleEmojiModalOpen, requestFetchEmojiReaction } from '../../../slice/record'
// import selectors
import { selectEmojiReactions } from '../../../selectors/record'
// import utils
import { hapticFeedBack } from '../../../utilities/Haptic'

interface RecordReactionProps {
  size: number
  id: string
  handleOnNavigate: () => void
}

const RecordReaction = (props: RecordReactionProps) => {
  const { size, id, handleOnNavigate } = props
  const dispatch =  useDispatch()
  const emojiReactionObj = selectEmojiReactions(id)

  useEffect(() => {
    dispatch(requestFetchEmojiReaction(id))
  }, [])

  const handleOpenEmojiModal = () => {
    hapticFeedBack('medium')
    dispatch(toggleEmojiModalOpen({ isOpen: true, selectedRecordId: id }))
  }

  const handleNavigateRecordShow = () => {
    hapticFeedBack('medium')
    handleOnNavigate()
  }

  return (
    <RecordReactionWrapper>
      <RecordReactionUpper>
        { !!emojiReactionObj ? <EmojiCountList emojiReaction={emojiReactionObj} /> : null }
        <EmojiBtn onPress={handleOpenEmojiModal}>
          <Image
            source={require('../../../assets/emoji/emojiDefault.png') }
            style={{ width: 30, height: 30, resizeMode: 'cover', alignSelf: 'center' }}
          />
        </EmojiBtn>
        <CommentWrapper onPress={handleNavigateRecordShow}>
          <Icon name="comment" size={20} style={{ color: COLORS.BASE_BORDER_COLOR }} />
          <RecordReactionSizeText>{size}</RecordReactionSizeText>
        </CommentWrapper>
      </RecordReactionUpper>
    </RecordReactionWrapper>
  )
}

const RecordReactionWrapper = styled.View`
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 0.3px;
  padding: 10px 10px 12px 10px;
`

const RecordReactionUpper = styled.View`
  flex-direction: row;
  align-items: center;
`

const CommentWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const EmojiBtn = styled.TouchableOpacity`
  margin-right: 15px;
`

const RecordReactionSizeText = styled.Text`
  margin-left: 5px;
  font-size: 15px;
  font-weight: bold;
  color: ${COLORS.SUB_BLACK};
`

export default RecordReaction
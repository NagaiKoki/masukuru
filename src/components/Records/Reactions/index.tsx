import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Image } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'
import { COLORS } from '../../../constants/Styles'
// import slices
import { toggleEmojiModalOpen, requestFetchEmojiReaction } from '../../../slice/record'
// import selectors
import recordSelector from '../../../selectors/record'

interface RecordReactionProps {
  size: number
  id: string
  handleOnNavigate: () => void
}

const RecordReaction = (props: RecordReactionProps) => {
  const { size, id, handleOnNavigate } = props
  const dispatch =  useDispatch()
  const { emojiReactions } = recordSelector()

  useEffect(() => {
    dispatch(requestFetchEmojiReaction(id))
  }, [])

  const handleOpenEmojiModal = () => {
    dispatch(toggleEmojiModalOpen({ isOpen: true, selectedRecordId: id }))
  }

  return (
    <RecordReactionWrapper>
      <RecordReactionUpper>
        <EmojiBtn onPress={handleOpenEmojiModal}>
          <Image
            source={require('../../../assets/emoji/emojiDefault.png') }
            style={{ width: 30, height: 30, resizeMode: 'cover', alignSelf: 'center' }}
          />
        </EmojiBtn>
        <CommentWrapper onPress={handleOnNavigate}>
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
  margin-left: 3px;
  font-size: 14px;
  font-weight: bold;
  color: ${COLORS.SUB_BLACK};
`

export default RecordReaction
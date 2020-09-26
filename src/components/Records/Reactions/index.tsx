import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Image } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'
import { COLORS } from '../../../constants/Styles'
// import slices
import { toggleEmojiModalOpen } from '../../../slice/record'

interface RecordReactionProps {
  size: number
  handleOnNavigate: () => void
}

const RecordReaction = (props: RecordReactionProps) => {
  const { size, handleOnNavigate } = props
  const dispatch =  useDispatch()

  const handleOpenEmojiModal = () => {
    dispatch(toggleEmojiModalOpen(true))
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
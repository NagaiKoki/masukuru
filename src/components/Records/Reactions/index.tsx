import React from 'react'
import styled from 'styled-components'
import { Image } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'
import { COLORS } from '../../../constants/Styles'
// import types
import { ResponseRecordType } from '../../../types/Record'

interface RecordReactionProps {
  size: number
  handleOnNavigate: () => void
}

const RecordReaction = (props: RecordReactionProps) => {
  const { size, handleOnNavigate } = props

 
  return (
    <RecordReactionWrapper>
      <RecordReactionUpper>
        <EmojiBtn>
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
  background-color: ${COLORS.BASE_WHITE};
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 0.3px;
  padding: 10px;
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
import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../constants/Styles'
import Icon from 'react-native-vector-icons/FontAwesome'

interface RecordCommentProps {
  recordId: string
  temporaryComment: string
  changeRecordCommentText: (text: string) => void
  requestPostRecordComment: (recordId: string) => void
}

const RecordComment = (props: RecordCommentProps) => {
  const { 
    recordId, 
    temporaryComment,
    changeRecordCommentText, 
    requestPostRecordComment 
  } = props

  const commentPresent = temporaryComment ? true : false
  
  const handleRequestPostComment = () => {
    if (!commentPresent) return
    requestPostRecordComment(recordId)
  }

  return (
    <CommentWrapper>
      <CommentFormWrapper>
        <CommentForm 
          placeholder="コメントを入力..."
          autoCapitalize={'none'}
          maxLength={300}
          autoCorrect={ false }
          onChangeText={ (text: string) => changeRecordCommentText(text) }
        />
        <SubmitBtnWrapper 
          onPress={handleRequestPostComment}
          commentPresent={commentPresent}
          disabled={!commentPresent}
        >
          <Icon name="paper-plane" size={27} style={{ color: COLORS.BASE_MUSCLEW }} />
        </SubmitBtnWrapper>
      </CommentFormWrapper>
    </CommentWrapper>
  )
}

const CommentWrapper = styled.View`
  background-color: ${COLORS.BASE_WHITE};
`

const CommentFormWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const CommentForm = styled.TextInput`
  background-color: ${COLORS.FORM_BACKGROUND};
  width: 85%;
  align-self: center;
  border-radius: 30px;
  padding: 10px 15px;
  margin: 10px;
  color: ${COLORS.BASE_BLACK};
`

const SubmitBtnWrapper = styled.View<{ commentPresent: boolean }>`
  width: 15%;
  opacity: ${props => props.commentPresent ? 1 : 0.5};
`

export default RecordComment;
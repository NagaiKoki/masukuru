import React, { useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../../../constants/Styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import firebase from '../../../config/firebase'
// import componets
import UserImage from '../../Image/userImage'

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

  const [text, setText] = useState('')
  const currentUser = firebase.auth().currentUser

  const commentPresent = temporaryComment ? true : false

  const handleOnChangeText = (value: string) => {
    setText(value)
    changeRecordCommentText(value)
  }
  
  const handleRequestPostComment = () => {
    if (!commentPresent) return
    requestPostRecordComment(recordId)
    setText('')
  }

  const renderUserImage = (
    <UserImageWrapper>
      <UserImage uri={currentUser.photoURL} width={30} height={30} borderRadius={60}/>
    </UserImageWrapper>
  )

  return (
    <CommentWrapper>
      <CommentFormWrapper>
        {renderUserImage}
        <CommentForm 
          placeholder="コメントを入力..."
          autoCapitalize={'none'}
          maxLength={300}
          value={text}
          autoFocus={true}
          autoCorrect={ false }
          onChangeText={ value => handleOnChangeText(value) }
        />
        <SubmitBtnWrapper 
          onPress={handleRequestPostComment}
          commentPresent={commentPresent}
          disabled={!commentPresent}
        >
          <Icon name="paper-plane" size={25} style={{ color: COLORS.BASE_MUSCLEW }} />
        </SubmitBtnWrapper>
      </CommentFormWrapper>
    </CommentWrapper>
  )
}

const CommentWrapper = styled.View`
  background-color: ${COLORS.BASE_WHITE};
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 0.3px;
`

const CommentFormWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const UserImageWrapper = styled.View`
  width: 10%;
  margin-left: 10px;
`

const CommentForm = styled.TextInput`
  background-color: ${COLORS.FORM_BACKGROUND};
  width: 75%;
  align-self: center;
  border-radius: 30px;
  padding: 10px 15px;
  margin: 10px 5px;
  color: ${COLORS.BASE_BLACK};
`

const SubmitBtnWrapper = styled.TouchableOpacity<{ commentPresent: boolean }>`
  width: 10%;
  margin-right: 2px;
  opacity: ${props => props.commentPresent ? 1 : 0.5};
`

export default RecordComment;
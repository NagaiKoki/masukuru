import React, { useState } from 'react'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications';
import styled from 'styled-components'
import { Keyboard, Platform } from 'react-native'
import { COLORS } from '../../../constants/Styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import firebase from '../../../config/firebase'
// import componets
import UserImage from '../../Image/userImage'
// import types
import { ResponseRecordType } from '../../../types/Record'
import { UserType } from '../../../types/User'
// import utils
import { sendPushNotification } from '../../../utilities/Push/sendPushNotification'

interface RecordCommentProps {
  record: ResponseRecordType
  currentUser?: UserType
  temporaryComment: string
  changeRecordCommentText: (text: string) => void
  requestPostRecordComment: (recordId: string) => void
}

const RecordComment = (props: RecordCommentProps) => {
  const { 
    record, 
    currentUser,
    temporaryComment,
    changeRecordCommentText, 
    requestPostRecordComment 
  } = props

  const { id, uid } = record
  const [text, setText] = useState('')
  
  const loginFirebaseUser = firebase.auth().currentUser
  const commentPresent = temporaryComment && text ? true : false

  const handleOnChangeText = (value: string) => {
    setText(value)
    changeRecordCommentText(value)
  }
  
  const handleRequestPostComment = async () => {
    if (!commentPresent && !text) return
    requestPostRecordComment(id)
    setText('')
    Keyboard.dismiss()
    if (Platform.OS === 'ios' && Device.isDevice) {
      await sendPushNotification(uid, `${currentUser.name}さんがあなたの投稿にコメントしました！`, text);
    }
  }

  const renderUserImage = (
    <UserImageWrapper>
      <UserImage uri={loginFirebaseUser.photoURL} width={30} height={30} borderRadius={60}/>
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
          autoCorrect={ false }
          onChangeText={ value => handleOnChangeText(value) }
        />
        <SubmitBtnWrapper 
          onPress={() => handleRequestPostComment()}
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
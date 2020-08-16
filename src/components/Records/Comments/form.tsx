import React, { useState } from 'react'
import * as Device from 'expo-device'
import styled from 'styled-components'
import { Keyboard, Platform } from 'react-native'
import { COLORS } from '../../../constants/Styles'
import Icon from 'react-native-vector-icons/FontAwesome'
// import componets
import UserImage from '../../Image/userImage'
// import types
import { ResponseRecordType } from '../../../types/Record'
import { NotificationEventType } from '../../../types/Notification'
import { UserType } from '../../../types/User'

interface RecordCommentProps {
  record: ResponseRecordType
  currentUser: UserType
  temporaryComment: string
  notificationGroupId?: string
  changeRecordCommentText: (text: string) => void
  requestPostRecordComment: (recordId: string, recordUserId: string, notificationGroupId?: string) => void
  requestPostPushNotification?: (eventType: NotificationEventType, uid: string, title: string, content: string) => void
}

const RecordComment = (props: RecordCommentProps) => {
  const { 
    record, 
    temporaryComment,
    notificationGroupId,
    currentUser,
    changeRecordCommentText, 
    requestPostRecordComment,
    requestPostPushNotification
  } = props

  const { id, uid } = record
  const [text, setText] = useState('')
  
  const commentPresent = temporaryComment && text ? true : false

  const handleOnChangeText = (value: string) => {
    setText(value)
    changeRecordCommentText(value)
  }
  
  const handleRequestPostComment = async () => {
    if (!commentPresent && !text) return
    requestPostRecordComment(id, uid, notificationGroupId)
    setText('')
    Keyboard.dismiss()
    if (Platform.OS === 'ios' && Device.isDevice && requestPostPushNotification && currentUser.isCommentPush) {
      requestPostPushNotification('comment', uid, `${currentUser.name}さんがあなたの記録にコメントしました！`, text);
    }
  }

  const renderUserImage = (
    <UserImageWrapper>
      <UserImage uri={currentUser.imageUrl} width={30} height={30} borderRadius={60}/>
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
  height: 40px;
  align-self: center;
  font-size: 17px;
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
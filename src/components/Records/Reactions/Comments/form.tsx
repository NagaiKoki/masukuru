import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Device from 'expo-device'
import styled from 'styled-components'
import { Keyboard, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
// import componets
import UserImage from '../../../Image/userImage'
// import types
import { ResponseRecordType, RequestPostRecordComment } from '../../../../types/Record'
import { NotificationEventType } from '../../../../types/Notification'
import { UserType } from '../../../../types/User'
// import utils
import { requestAppReview } from '../../../../utilities/requestReview'
import { hapticFeedBack } from '../../../../utilities/Haptic'
// import config
import Analytics from '../../../../config/amplitude'
// import css
import { TextInputStyles } from './FormStyles'
// import lib
import { MentionEditor } from '../../../../lib/Mention/Editor'
// import selectors
import { useGroupSelector } from '../../../../selectors/group'
// import constants
import { COLORS } from '../../../../constants/Styles'
import { IMAGE_URL } from '../../../../constants/imageUrl'

interface RecordCommentProps {
  record: ResponseRecordType
  currentUser: UserType
  notificationGroupId?: string
  requestPostRecordComment: (arg: RequestPostRecordComment) => void
  requestPostPushNotification?: (eventType: NotificationEventType, uid: string, title: string, content: string) => void
}

const RecordComment = (props: RecordCommentProps) => {
  const {
    record,
    notificationGroupId,
    currentUser,
    requestPostRecordComment,
    requestPostPushNotification
  } = props

  const { id, uid } = record
  const [text, setText] = useState('')
  const { currentGroupUsers, requestFetchCurrentGroupUsers } = useGroupSelector()
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentGroupUsers.length) {
      requestFetchCurrentGroupUsers()
    }
  }, [])

  if (!currentGroupUsers.length) {
    return <></>
  }

  const handleOnChangeText = (value: string) => {
    setText(value)
  }

  const handleRequestPostComment = async () => {
    if (!text) return
    setText('')
    dispatch(requestPostRecordComment({ recordId: id, recordUserId: uid, notificationGroupId, text }))
    hapticFeedBack('medium')
    Keyboard.dismiss()
    Analytics.track('commented', { text: text })
    if (Platform.OS === 'ios' && Device.isDevice && requestPostPushNotification && currentUser.isCommentPush) {
      dispatch(requestPostPushNotification('comment', uid, `⭐ ${currentUser.name}さんがあなたの記録にコメントしました！`, text))
    }
    await requestAppReview()
  }

  const groupUserNames = currentGroupUsers.map(user => {
    return {
      id: user.uid,
      name: user.name,
      imageUrl: user.imageUrl || IMAGE_URL.DEFAULT_PROFILE_IMAGE
    }
  })

  const renderUserImage = (
    <UserImageWrapper>
      <UserImage uri={currentUser.imageUrl} width={30} height={30} borderRadius={60}/>
    </UserImageWrapper>
  )

  return (
    <CommentWrapper>
      <CommentFormWrapper>
        {renderUserImage}
        <MentionEditor 
          keyword={text}
          mentionItems={groupUserNames}
          placeholder="コメントを入力する..."
          textInputStyles={TextInputStyles}
          onChangeText={handleOnChangeText}
        />
        {/* <CommentForm 
          placeholder="コメントを入力..."
          autoCapitalize={'none'}
          maxLength={300}
          multiline={true}
          value={text}
          autoCorrect={false}
          onChangeText={ value => handleOnChangeText(value) }
        /> */}
        <SubmitBtnWrapper 
          onPress={() => handleRequestPostComment()}
          commentPresent={!!text}
          disabled={!text}
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
  min-height: 40px;
  max-height: 150px;
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
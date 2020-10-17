import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Keyboard, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
// import apis
import { requestSendPushNotification } from '../../../../apis/Push'
// import componets
import UserImage from '../../../Image/userImage'
// import types
import { ResponseRecordType, RequestPostRecordComment, MentionTargetType } from '../../../../types/Record'
import { NotificationEventType } from '../../../../types/Notification'
import { UserType } from '../../../../types/User'
import { RootState } from '../../../../reducers'
// import slices
import { changeCommnetKeyword, setMentionTargets } from '../../../../slice/record'
// import utils
import { hapticFeedBack } from '../../../../utilities/Haptic'
import { lazyFunction } from '../../../../utilities/Function/lazyFunction'
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

type MentionTarget = {
  id: string
  target: string
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
  const { currentGroupUsers, requestFetchCurrentGroupUsers } = useGroupSelector()
  const commentKeyword = useSelector<RootState, string>(state => state.records.commentKeyword)
  const mentionTargets = useSelector<RootState, MentionTargetType[]>(state => state.records.mentionTargets)
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentGroupUsers.length) {
      requestFetchCurrentGroupUsers()
    }
  }, [])

  if (!currentGroupUsers.length) {
    return <></>
  }

  const handleDispatchCommentKeyword = (value: string) => {
    dispatch(changeCommnetKeyword(value))
  }

  const handleOnChangeText = (value: string) => {
    handleDispatchCommentKeyword(value)
  }

  const handleRequestPostComment = async () => {
    if (!commentKeyword) return
    hapticFeedBack('medium')
    Keyboard.dismiss()
    Analytics.track('commented', { text: commentKeyword })
    const content = `${currentUser.name}さん: ${commentKeyword}`
    const targetIds = mentionTargets.map(target => target.id)
    const commentType = !mentionTargets.filter(t => t.id).length ? 'reply' : 'comment'
    dispatch(requestPostRecordComment({ recordId: id, recordUserId: uid, notificationGroupId, text: commentKeyword, mentionIds: targetIds, type: commentType }))
    if (Platform.OS === 'ios' && requestPostPushNotification) {
      if (!mentionTargets.filter(t => t.id).length) {
        await requestSendPushNotification(uid, `⭐ ${currentUser.name}さんがあなたの記録にコメントしました！`, content)
      } else {
        mentionTargets.forEach(async target => {
          const title = `⭐ ${currentUser.name}さんがあなた宛にコメントしました！`
          await requestSendPushNotification(target.id, title, content)
        })
      }
    }
    dispatch(changeCommnetKeyword(''))
  }

  const handleAddMentionTargetIds = (target: MentionTarget) => {
    const updatedTargets = [...mentionTargets, target]
    const newMap = new Map(updatedTargets.map(target => [target.id, target]))
    const newArray = Array.from(newMap.values())
    const removedEmptyIds = newArray.filter(target => !!target.id)
    dispatch(setMentionTargets({ mentionTargets: removedEmptyIds, type: 'comment' }))
  }

  const handleRemoveMentionTargetIds = (id: string) => {
    const updatedTargets = mentionTargets.filter(target => target.id !== id)
    dispatch(setMentionTargets({ mentionTargets: updatedTargets, type: 'comment' }))
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
          keyword={commentKeyword}
          targets={mentionTargets}
          mentionItems={groupUserNames}
          placeholder="コメントを入力する..."
          textInputStyles={TextInputStyles}
          onChangeText={handleOnChangeText}
          addMentionTarget={handleAddMentionTargetIds}
          removeMentionTarget={handleRemoveMentionTargetIds}
        />
        <SubmitBtnWrapper 
          onPress={() => handleRequestPostComment()}
          commentPresent={!!commentKeyword}
          disabled={!commentKeyword}
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

const SubmitBtnWrapper = styled.TouchableOpacity<{ commentPresent: boolean }>`
  width: 10%;
  margin-right: 2px;
  opacity: ${props => props.commentPresent ? 1 : 0.5};
`

export default RecordComment;
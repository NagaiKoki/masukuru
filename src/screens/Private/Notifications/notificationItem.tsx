import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/Styles';
// import apis
import { requestFetchUser } from '../../../apis/Users'
import { requestFetchRecordItem } from '../../../apis/Records'
import { requestReadCommentNotification, requestReadOfficialNotification } from '../../../apis/Notifications'
// import types
import { NotificationType } from '../../../types/Notification'
import { UserType } from '../../../types/User'
import { ResponseRecordType } from '../../../types/Record'
// import lib
import { convertTimestampToString } from '../../../utilities/timestamp'
// import config
import firebase from '../../../config/firebase'
// import components
import UserImage from '../../../components/Image/userImage'

interface ItemProps {
  item: NotificationType
  navigation: any
  requestReadNotification: (id: string) => void
}

export interface NotificationContenTypes {
  item: NotificationType
  requestReadNotification: (id: string) => void
}

const NotificationItem = (props: ItemProps) => {
  const { item, navigation, requestReadNotification } = props
  const { id, title, type, read, from, groupId, recordId, createdAt, readUserIds } = item;
  const time = convertTimestampToString(createdAt, undefined)
  const currentUser = firebase.auth().currentUser
  const [user, setUser] = useState<UserType>(null)  
  const [isFetching, setIsFetching] = useState(true)

  const ContentProps: NotificationContenTypes = {
    item: item, 
    requestReadNotification: requestReadNotification
  }
  
  useEffect(() => {
    const fetchUser = async () => {
      if (type === 'comment') {
        const { user, error }: { user?: UserType, error?: string } = await requestFetchUser(from)
        if (user && !error) {
          setUser(user)
        }
      }
      setIsFetching(false)
    }
    fetchUser()
  }, [])

  const isRead = () => { 
    if (type === 'official') {
      const id = readUserIds.find(id => String(id) === currentUser.uid)
      return !!id 
    } else if (type === 'comment') {
      return !!read
    }
  }

  const handleNavigateRecordShow = async () => {
    await requestReadCommentNotification(id)
    const { payload }: { payload?: ResponseRecordType } = await requestFetchRecordItem(recordId)
    navigation.navigate('recordShow', { record: payload, notificationGroupId: groupId })
  }

  const handleNavigateOffcialNotificationContent = async () => {
    await requestReadOfficialNotification(id)
    navigation.navigate('NotificationContent', ContentProps)
  }

  const renderCommentContent = () => {
    if (!isFetching && user) {
      return (
        <React.Fragment>
          <UserWrapper>
            <UserImage uri={user.imageUrl} width={30} height={30} borderRadius={60} />
          </UserWrapper>
          <ItemWrapper>
            <ItemTime>{time}</ItemTime>
            <ItemTitle>{user.name}からあなたの投稿にコメントがありました。</ItemTitle>
          </ItemWrapper>
        </React.Fragment>
      )
    }
    return null
  }

  const renderCommentItem = () => {
    return (
      <ItemContainer 
        onPress={handleNavigateRecordShow}
        isRead={isRead()}
      >
        {renderCommentContent()}
      </ItemContainer>
    )
  }

  const renderOfficialItem = () => {
    return (
      <ItemContainer 
        onPress={handleNavigateOffcialNotificationContent} 
        isRead={isRead()} 
      >
        <ItemWrapper>
          <ItemTime>{time}</ItemTime>
          <ItemTitle>{title}</ItemTitle>
        </ItemWrapper>
      </ItemContainer>
    )
  }

  return (
    <React.Fragment>
      { type === 'official' ? (
        renderOfficialItem()
      ) : renderCommentItem() }
    </React.Fragment>
  )
}

const ItemContainer = styled.TouchableOpacity<{ isUnRead: boolean }>`
  padding: 15px 15px;
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
  background-color: ${COLORS.BASE_WHITE};
  border-bottom-width: 0.5px;
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.isRead ? COLORS.BASE_WHITE : COLORS.BASE_BACKGROUND2};
`

const ItemBatch = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 60px;
  background-color: ${COLORS.BASE_MUSCLEW};
`

const ItemWrapper = styled.View`
  width: 87%;
`

const ItemTime = styled.Text`
  color: ${COLORS.SUB_BLACK};
  font-size: 14px;
`

const ItemTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 16px;
`

const UserWrapper = styled.View`
  width: 13%;
`

export default NotificationItem;
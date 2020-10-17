import React from 'react'
import styled from 'styled-components'
import { Image } from 'react-native'
// import types
import { NotificationType } from '../../types/Notification'
// imort constants
import { COLORS } from '../../constants/Styles'
// import selectors
import { notificationActions } from '../../selectors/notification'
// import config
import firebase from '../../config/firebase'

type Props = {
  notification: NotificationType
  navigation: any
}

const NotificationOffcialItem = (props: Props) => {
  const { notification, navigation } = props
  const { id, title, type, readUserIds } = notification
  const currentUserId = firebase.auth().currentUser.uid
  const { requestReadNotification } = notificationActions()

  const handleOnPress = () => {
    requestReadNotification({ id, type })
    navigation.navigate('NotificationContent', { item: notification })
  }

  const isRead = readUserIds.some(id => id === currentUserId)

  if (!title) {
    return <></>
  }

  return (
    <Wrapper isRead={isRead} activeOpacity={0.8} onPress={handleOnPress}>
      <Image source={require('../../assets/logo.png')} style={{ borderRadius: 60, width: 35, height: 35 }} />
      <Text>{title}</Text>
    </Wrapper>
  )
}

export default NotificationOffcialItem

const Wrapper = styled.TouchableOpacity<{ isRead: boolean }>`
  flex-direction: row;
  align-items: center;
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
  border-bottom-width: 0.5px;
  padding: 15px;
  background: ${props => props.isRead ? COLORS.BASE_WHITE : COLORS.MUSCLEW_COLOR2};
`

const Text = styled.Text`
  width: 85%;
  margin-left: 10px;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
  line-height: 20;
`


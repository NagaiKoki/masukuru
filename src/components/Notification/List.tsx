import React from 'react'
import styled from 'styled-components'
// import types
import { NotificationType } from '../../types/Notification'
// import components
import NotificationOfficialItem from './OfficialItem'
import RecordNotificationItem from './UserNotifications'

type Props = {
  notifications: NotificationType[]
  navigation: any
}

const NotificationList = (props: Props) => {
  const { notifications, navigation } = props

  const notificationList = notifications.map((notification, i) => {
    const type = notification.type

    switch (type) {
      case 'official': {
        return <NotificationOfficialItem key={i} notification={notification} navigation={navigation} />
      }
      default:
        return <RecordNotificationItem key={i} notification={notification} navigation={navigation} />
    }
  })
  
  return (
    <Wrapper>
      {notificationList}
    </Wrapper>
  )
}

export default NotificationList

const Wrapper = styled.View``
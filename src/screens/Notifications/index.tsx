import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import { useFocusEffect } from '@react-navigation/native';
// import apis
import { requestNotifications } from '../../apis/Notifications/'
// import components
import Loading from '../../components/Loading'
import NotificationItem from './notificationItem'

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      const getNotifications = async () => {
        const data = await requestNotifications()
        setNotifications(data)
      }
      getNotifications()
      setIsLoading(false)
    }, [])
  )

  if (isLoading) {
    return (
      <Loading size="small" />
    )
  }

  const renderItem = notifications.map((item, index) => (<NotificationItem item={item} key={index} navigation={navigation} />))


  return (
    <NotificationConitainer>
      <NotificationListWrapper>
        {renderItem}
      </NotificationListWrapper>
    </NotificationConitainer>
  )
}

export default NotificationScreen

const NotificationConitainer =  styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const NotificationListWrapper = styled.View`
`


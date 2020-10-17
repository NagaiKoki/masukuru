import React, { useState, useCallback } from 'react';
import { RefreshControl, ScrollView } from 'react-native'
import styled from 'styled-components';
import { COLORS } from '../../../constants/Styles';
import { useFocusEffect } from '@react-navigation/native';
// import selectors
import { 
  notificationActions, 
  _notificationItems,
  _isLoading
} from '../../../selectors/notification'
// import components
import NotificationList from '../../../components/Notification/List'

const NotificationScreen = ({ navigation }) => {
  const { requestFetchNotifications, requestFetchNotReadNotificationNumber } = notificationActions()
  const [isRefresh, setIsRefresh] = useState(false)
  const notificationItems = _notificationItems()

  useFocusEffect(
    useCallback(() => {
      requestFetchNotReadNotificationNumber()
      if (!notificationItems.length) {
        requestFetchNotifications()
      }
    }, [])
  )

  const onRefresh = () => {
    setIsRefresh(true)
    requestFetchNotifications()
    setIsRefresh(false)
  }

  return (
    <NotificationConitainer>
      <ScrollView
        refreshControl={
          <RefreshControl 
           refreshing={isRefresh}
           onRefresh={onRefresh}
          />
        }
      >
       <NotificationList notifications={notificationItems} navigation={navigation} />
      </ScrollView>
    </NotificationConitainer>
  )
}

export default NotificationScreen

const NotificationConitainer =  styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`


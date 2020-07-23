import React, { useState, useCallback } from 'react';
import { RefreshControl, ScrollView } from 'react-native'
import styled from 'styled-components';
import { COLORS } from '../../../constants/Styles';
import { useFocusEffect } from '@react-navigation/native';
// import types
import { NotificationProps } from '../../../containers/Private/notifications'
// import components
import Loading from '../../../components/Loading'
import NotificationItem from './notificationItem'

const NotificationScreen = (props: NotificationProps) => {
  const { navigation, notifications, actions } = props
  const { isLoading, notificationItems, error } = notifications
  const { requestFetchNotifications, requestReadNotification } = actions
  const [isRefresh, setIsRefresh] = useState(false)

  useFocusEffect(
    useCallback(() => {
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

  const renderItem = notificationItems.map((item, index) => (
    <NotificationItem 
      item={item} 
      key={index} 
      navigation={navigation}
      requestReadNotification={requestReadNotification}
    />
  ))

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
        { isLoading && !isRefresh ? <Loading size='small'/> : null}
        { error ? 
        <ErrorMessage>{error}</ErrorMessage>
        : <NotificationListWrapper>
          {renderItem}
        </NotificationListWrapper> }
      </ScrollView>
    </NotificationConitainer>
  )
}

export default NotificationScreen

const NotificationConitainer =  styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const ErrorMessage = styled.Text`
  text-align: center;
  font-size: 14px;
  color: ${COLORS.BASE_BLACK};
`

const NotificationListWrapper = styled.View`
`


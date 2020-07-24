import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { COLORS } from '../../../constants/Styles';
import styled from 'styled-components'
// import types
import { NotificationContenTypes } from './notificationItem'
import { NotificationType } from '../../../types/Notification';
// import lib
import { convertTimestampToString } from '../../../utilities/timestamp'

interface NotificationContentProps {
  route: {
    params: NotificationContenTypes
  }
}

const NotificationContentScreen = (props: NotificationContentProps) => {
  const { route } = props
  const { item } = route.params
  const { id, title, createdAt, contents } = item
  const time = convertTimestampToString(createdAt, undefined)

  return (
    <ScrollView>
      <ContentWrapper>
        <ContentTitle>{title}</ContentTitle>
        <ContentTimestamp>{time}</ContentTimestamp>
        <ContentMain>{contents.replace(/\s\s/g, '\n')}</ContentMain>
      </ContentWrapper>
    </ScrollView>
  )
}

export default NotificationContentScreen;

const ContentWrapper = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
  padding: 30px 10px;
`

const ContentTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  
`

const ContentTimestamp = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
  text-align: right;
  padding: 10px;
`

const ContentMain = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 15px;
  padding: 20px 0;
`
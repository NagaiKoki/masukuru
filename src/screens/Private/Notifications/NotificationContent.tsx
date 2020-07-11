import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { COLORS } from '../../../constants/Styles';
import styled from 'styled-components'
// import types
import { NotificationProps } from '../../../containers/Private/notifications'
// import lib
import { convertTimestampToString } from '../../../utilities/timestamp'

const NotificationContentScreen = (props: NotificationProps) => {
  const { navigation, route, notifications, actions } = props
  const { requestReadNotification } = actions
  const { id, title, createdAt, contents, from } = route.params.item
  const time = convertTimestampToString(createdAt, undefined)

  useFocusEffect(
    useCallback(() => {
      requestReadNotification(id)
    }, [])
  )

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
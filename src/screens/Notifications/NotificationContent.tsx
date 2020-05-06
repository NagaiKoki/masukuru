import React from 'react';
import { COLORS } from '../../constants/Styles';
import styled from 'styled-components'
// import lib
import { convertTimestampToString } from '../../lib/timestamp'

const NotificationContentScreen = ({ navigation, route }) => {
  const { title, createdAt, contents, from } = route.params.item
  const time = convertTimestampToString(createdAt)
  return (
    <ContentWrapper>
      <ContentTitle>{title}</ContentTitle>
      <ContentTimestamp>{time}</ContentTimestamp>
      <ContentMain>{contents}</ContentMain>
    </ContentWrapper>
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
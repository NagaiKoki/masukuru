import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
// import types
import { NotificationType } from '../../types'
// import lib
import { convertTimestampToString } from '../../lib/timestamp'


interface ItemProps {
  item: NotificationType
  navigation: any
}

const NotificationItem = (props: ItemProps) => {
  const { item, navigation } = props
  const { title, createdAt } = item;

  const time = convertTimestampToString(createdAt)

  return (
    <ItemContainer onPress={ () =>  navigation.navigate('NotificationContent', { item: item })} >
      <ItemWrapper>
        <ItemTime>{time}</ItemTime>
        <ItemTitle>{title}</ItemTitle>
      </ItemWrapper>
    </ItemContainer>
  )
}

const ItemContainer = styled.TouchableOpacity`
  padding: 15px 10px;
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
  background-color: ${COLORS.BASE_WHITE};
  border-bottom-width: 0.5px;
`

const ItemWrapper = styled.View`
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

export default NotificationItem;
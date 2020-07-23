import React, { useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/Styles';
// import types
import { NotificationType } from '../../../types/Notification'
// import lib
import { convertTimestampToString } from '../../../utilities/timestamp'
// import config
import firebase from '../../../config/firebase'

interface ItemProps {
  item: NotificationType
  navigation: any
}

const NotificationItem = (props: ItemProps) => {
  const { item, navigation } = props
  const { title, type, read, createdAt, readUserIds } = item;
  const time = convertTimestampToString(createdAt, undefined)
  const currentUser = firebase.auth().currentUser

  useEffect(() => {

  }, [])

  const isUnRead = () => { 
    const id = readUserIds.find(id => String(id) === currentUser.uid)
    if (id) {
      return false
    } else {
      return true
    }
  }

  const renderOfficialItem = () => {
    return (
      <ItemContainer onPress={ () =>  navigation.navigate('NotificationContent', { item: item })} isUnRead={isUnRead()} >
        <ItemWrapper>
          <ItemTime>{time}</ItemTime>
          <ItemTitle>{title}</ItemTitle>
        </ItemWrapper>
        { isUnRead() ? <ItemBatch /> : null }
      </ItemContainer>
    )
  }

  const renderCommentItem = () => {
    return (
      <ItemContainer>
        <ItemWrapper>
          <ItemTime>{time}</ItemTime>
          <ItemTitle>からあなたの投稿にコメントがありました。</ItemTitle>
        </ItemWrapper>
        { !read ? <ItemBatch /> : null }
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
  justify-content: space-between;
  background-color: ${props => props.isUnRead ? COLORS.BASE_BACKGROUND2 : COLORS.BASE_WHITE};
`

const ItemBatch = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 60px;
  background-color: ${COLORS.BASE_MUSCLEW};
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
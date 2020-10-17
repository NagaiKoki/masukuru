import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../../constants/Styles'
// import apis
import { requestFetchRecordItem } from '../../../apis/Records'
// import types
import { NotificationType } from '../../../types/Notification'
import { UserType } from '../../../types/User'
// import components
import UserImage from '../../Image/userImage'
// import selectors
import { notificationActions } from '../../../selectors/notification'

type Props = {
  notification: NotificationType
  user: UserType
  navigation: any
}

const RecordNotificationItem = (props: Props) => {
  const { notification, user, navigation } = props
  const { id, recordId, read, type, groupId } = notification
  const { name, imageUrl } = user
  const { requestReadNotification } = notificationActions()

  const handleOnPress = async () => {
    const { payload } = await requestFetchRecordItem(recordId)
    requestReadNotification({ id, type })
    navigation.navigate('notificationRecordShow', { notificationGroupId: groupId, record: payload  })
  }

  const title = (): string => {
    switch(type) {
      case 'comment': {
        return 'さんからあなたの記録にコメントが届きました！'
      }
      case 'reply': {
        return 'さんからあなた宛にコメントが届きました！'
      }
      case 'emoji': {
        return 'さんがあなたの記録にリアクションしました！'
      }
      default: {
        ''
      }
    }
  }

  const renderText =
    <Text>
      <UserName>{name}</UserName>
      <Text>{title()}</Text>
    </Text>

  return (
    <Wrapper isRead={read} activeOpacity={0.8} onPress={handleOnPress}>
      <UserImage uri={imageUrl} width={35} height={35} borderRadius={60} />
      {renderText}
    </Wrapper>
  )
}

export default RecordNotificationItem

const Wrapper = styled.TouchableOpacity<{ isRead: boolean }>`
  flex-direction: row;
  align-items: center;
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
  border-bottom-width: 0.5px;
  padding: 18px;
  background: ${props => props.isRead ? COLORS.BASE_WHITE : COLORS.MUSCLEW_COLOR2};
`

const Text = styled.Text`
  width: 85%;
  margin-left: 10px;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
  line-height: 20;
`

const UserName = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 16px;
`
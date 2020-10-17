import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import apis
import { requestFetchUser } from '../../../apis/Users'
// import types
import { NotificationType } from '../../../types/Notification'
import { UserType } from '../../../types/User'
// import components
import RecordNotificationItem from './RecordItem'

type Props = {
  notification: NotificationType
  navigation: any
}

const UserNotificationItem = (props: Props) => {
  const { notification, navigation } = props
  const { from } = notification

  const [user, setUser] = useState<UserType>(null)

  const fetchUser = async () => {
    const { user } = await requestFetchUser(from)
    setUser(user)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  if (!user) {
    return <></>
  }

  return (
    <Wrapper>
      <RecordNotificationItem notification={notification} user={user} navigation={navigation} />
    </Wrapper>
  )
}

export default UserNotificationItem

const Wrapper = styled.View``
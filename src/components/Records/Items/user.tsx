import React from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../../constants/Styles'
// import components
import UserImage from '../../Image/userImage'
// db
import firebase from '../../../config/firebase'
// import apis
import { requestFetchUser } from '../../../apis/Users'
// import types
import { UserType } from '../../../types/User'

interface UserProps {
  currentUser: firebase.User
  user: UserType
  uid: string
  navigation: any
}

const RecordUser = (props: UserProps) => {
  const { currentUser, user, uid, navigation } = props
  return (
    <RecordUserWrapper>
      <RecordUserImage onPress={ () => navigation && currentUser.uid !== uid ? navigation.navigate('UserPage', { user: user }) : {} }>
        <UserImage uri={user.imageUrl} width={40} height={40} borderRadius={60} />
      </RecordUserImage>
      <RecordUserName>{user.name}</RecordUserName>
    </RecordUserWrapper>
  )
}

const RecordUserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

const RecordUserImage = styled.TouchableOpacity`
`

const RecordUserName = styled.Text`
  margin-left: 13px;
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 17px;
`

export default RecordUser
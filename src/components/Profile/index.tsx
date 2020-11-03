import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../constants/Styles'
// import types
import { UserType } from '../../types/User'
// import components
import UserImage from './UserImage'
import BasicInfo from './BasicInfo'

type Props = {
  navigation: any
  user: UserType
  type: 'myPage' | 'userPage'
}

const Profile = (props: Props) => {
  const { navigation, user, type } = props
  const { name, imageUrl } = user

  return (
    <Container>
      <Upper>
        <ImageWrpper>
          <UserImage imageUrl={imageUrl} />
          <UserName>{name}</UserName>
        </ImageWrpper>
        { type === 'myPage' ?
        <ChangeButton onPress={() => navigation.navigate('profileChange', { user: user })}>
          <ChangeText>編集</ChangeText>
        </ChangeButton> : null }
      </Upper>
      <Lower>
        <BasicInfo type={type} user={user} />
      </Lower>
    </Container>
  )
}

export default Profile

const Container = styled.View`
  padding: 30px 20px;
`

const Upper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const ImageWrpper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const UserName = styled.Text`
  margin: 10px 0 0 15px;
  width: 100px;
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 16px;
`

const ChangeButton = styled.TouchableOpacity`
  border: 2px solid ${COLORS.BASE_MUSCLEW};
  border-radius: 20px;
  padding: 4px 10px;
  height: 28px;
`

const ChangeText = styled.Text`
  color: ${COLORS.BASE_MUSCLEW};
  font-size: 14px;
`

const Lower = styled.View``
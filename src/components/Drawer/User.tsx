import React from 'react'
import styled from 'styled-components'
// import types
import { UserType } from '../../types/User'
// import components
import UserImage from '../../components/Image/userImage'
// import constants
import { COLORS } from '../../constants/Styles'

type PropsType = {
  currentUser: UserType
  onClick: () => void
}

const DrawerUser = (props: PropsType) => {
  const { currentUser, onClick } = props
  const { imageUrl, name } = currentUser

  return (
    <Wrapper onPress={onClick}>
      <UserImage uri={imageUrl} width={60} height={60} borderRadius={60} />
      <Name>{name}</Name>
    </Wrapper>
  )
}

export default DrawerUser

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const Name = styled.Text`
  padding-left: 15px;
  color: ${COLORS.BASE_BLACK};
  font-size: 18px;
  font-weight: bold;
`
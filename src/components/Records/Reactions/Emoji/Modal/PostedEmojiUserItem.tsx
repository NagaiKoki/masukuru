import React from 'react'
import styled from 'styled-components'
// import components
import UserImage from '../../../../Image/userImage'
// import types
import { UserType } from '../../../../../types/User'
import { COLORS } from '../../../../../constants/Styles';

interface PropsType {
  user: UserType
}

const UserItem = (props: PropsType) => {
  const { user } = props
  const { name, imageUrl } = user

  return (
    <Wrapper>
      <ImageWrapper>
        <UserImage uri={imageUrl} width={40} height={40} borderRadius={60} />
      </ImageWrapper>
      <UserName>{name}</UserName>
    </Wrapper>
  )
}

export default UserItem

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`

const ImageWrapper = styled.View`
  margin-right: 10px;
`

const UserName = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
  font-weight: bold;
`
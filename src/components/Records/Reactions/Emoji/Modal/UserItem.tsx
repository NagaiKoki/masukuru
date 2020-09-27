import React from 'react'
import styled from 'styled-components'
// import components
import UserImage from '../../../../Image/userImage'
// import types
import { UserType } from '../../../../../types/User'

interface PropsType {
  user: UserType
}

const UserItem = (props: PropsType) => {
  const { user } = props
  const { name, imageUrl } = user

  return (
    <Wrapper>
      <ImageWrapper>
        <UserImage uri={imageUrl} width={40} height={40} borderRadius={8} />
      </ImageWrapper>
      <UserName>{name}</UserName>
    </Wrapper>
  )
}

export default UserItem

const Wrapper = styled.View``

const ImageWrapper = styled.View``

const UserName = styled.Text``
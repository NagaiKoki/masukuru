import React from 'react'
import styled from 'styled-components'
// import types
import { GroupUserType } from '../../../types/Group'
// import constants
import { COLORS } from '../../../constants/Styles'
// import components
import MemberItem from './Item'

type PropsType = {
  currentGroupUsers: GroupUserType[]
  isLoading: boolean
  navigation: any
}

const MemberList = (props: PropsType) => {
  const { currentGroupUsers, isLoading, navigation } = props
  
  if (isLoading) {
    return <></>
  }

  const renderUserList = currentGroupUsers.map(user => (
    <MemberItem key={user.uid} groupUser={user} navigation={navigation} />
  ))

  return (
    <Wrapper>
      {renderUserList}
    </Wrapper>
  )
}

export default MemberList

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  height: 70px;
  padding: 10px 5px 5px 5px;
  background: ${COLORS.BASE_WHITE};
`
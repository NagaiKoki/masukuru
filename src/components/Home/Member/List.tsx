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
    <Wrapper horizontal={true}>
      {renderUserList}
    </Wrapper>
  )
}

export default MemberList

const Wrapper = styled.ScrollView`
  position: absolute;
  top: 0;
  width: 100%;
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
  border-bottom-width: 0.3px;
  height: 80px;
  padding: 10px 5px 5px 5px;
  background: ${COLORS.BASE_WHITE};
`
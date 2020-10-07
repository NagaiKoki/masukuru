import React, { useEffect } from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../../constants/Styles'
// import selectors
import { useGroupSelector } from '../../../selectors/group'
// import components
import MemberItem from './Item'

type PropsType = {
  onClick: () => void
}

const MemberList = (props: PropsType) => {
  const { onClick } = props
  const { currentGroupUsers, isLoading, requestFetchCurrentGroupUsers } = useGroupSelector()

  useEffect(() => {
    requestFetchCurrentGroupUsers()
  }, [])

  if (isLoading) {
    return <></>
  }

  const renderUserList = currentGroupUsers.map(user => (
    <MemberItem key={user.uid} groupUser={user} onClick={onClick} />
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
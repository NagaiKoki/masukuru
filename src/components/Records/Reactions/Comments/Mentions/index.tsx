import React, { useEffect } from 'react'
import styled from 'styled-components'
// import selectors
import { useGroupSelector } from '../../../../../selectors/group'

const CommentMention = () => {
  const { currentGroupUsers, requestFetchCurrentGroupUsers } = useGroupSelector()

  useEffect(() => {
    requestFetchCurrentGroupUsers()
  }, [])

  if (currentGroupUsers.length) {
    return <></>
  }

  return (
    <Wrapper>

    </Wrapper>
  )
}

export default CommentMention

const Wrapper = styled.View``
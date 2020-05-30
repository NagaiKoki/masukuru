import React from 'react'
import styled from 'styled-components'
// import types
import { RecordCommentType } from '../../../types/Record'
// import components
import RecordCommentItem from './commentItem'

interface RecordCommentListProps {
  comments: RecordCommentType[]
}

const RecordCommentList = (props: RecordCommentListProps) => {
  const { comments } = props

  const commentList = comments.map(comment => (
    <RecordCommentItem comment={comment} />
  ))

  return (
    <CommnetListWrapper>
      {commentList}
    </CommnetListWrapper>
  )
}

const CommnetListWrapper = styled.View`

`

export default RecordCommentList;
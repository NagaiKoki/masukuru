import React from 'react'
import styled from 'styled-components'
// import types
import { RecordCommentType } from '../../../types/Record'

interface RecordCommentListProps {
  comment: RecordCommentType
}

const RecordCommentItem = (props: RecordCommentListProps) => {
  const { comment } = props
  const { content } = comment
 
  return (
    <CommnetItemWrapper>
      <CommentItemContent>{content}</CommentItemContent>
    </CommnetItemWrapper>
  )
}

const CommnetItemWrapper = styled.View`

`

const CommentItemContent = styled.Text``

export default RecordCommentItem;
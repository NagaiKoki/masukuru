import React from 'react'
import styled from 'styled-components'
// import types
import { RecordCommentType } from '../../../types/Record'
// import components
import RecordCommentItem from './commentItem'
import { COLORS } from '../../../constants/Styles'

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
  background-color: ${COLORS.BASE_WHITE};
  margin-top: -20px;
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 0.3px;
  padding: 15px 0;
`

export default RecordCommentList;
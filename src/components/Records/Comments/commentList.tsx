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
    <RecordCommentItem key={comment.id} comment={comment} />
  ))

  return (
    <CommnetListWrapper commentPresent={comments.length}>
      {
        comments.length ? 
        <CommentListTitle>コメント {comments.length}件</CommentListTitle>
        : null
      }
      {commentList}
    </CommnetListWrapper>
  )
}

const CommnetListWrapper = styled.View<{ commentPresent: boolean }>`
  background-color: ${props => props.commentPresent ? COLORS.BASE_WHITE : COLORS.BASE_BACKGROUND}; 
  margin-top: ${props => props.commentPresent ? '-20px' : '-10px'};
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 0.3px;
  padding: 15px 0;
`

const CommentListTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
  font-weight: bold;
  margin: 5px 10px 10px 10px;
`

export default RecordCommentList;
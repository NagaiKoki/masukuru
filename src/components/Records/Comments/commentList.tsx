import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import apis
import { requestCurrentGroupId  } from '../../../apis/Groups/transfer'
// import types
import { RecordCommentType } from '../../../types/Record'
// import components
import RecordCommentItem from './commentItem'
import Loading from '../../Loading'
import { COLORS } from '../../../constants/Styles'
import store from '../../../reducers'
import { requestFetchNotReadNotificationNumber } from '../../../actions/notifications'

interface RecordCommentListProps {
  comments: RecordCommentType[]
  requestDeleteRecordComment: (recordId: string, commentId: string) => void
}

const RecordCommentList = (props: RecordCommentListProps) => {
  const { comments, requestDeleteRecordComment } = props

  const [currentGroupId, setCurrentGroupId] = useState('')

  const fetchCurrentGroupId = async () => {
    const groupId = await requestCurrentGroupId()
    setCurrentGroupId(groupId)
  }

  useEffect(() => {
    fetchCurrentGroupId()
    store.dispatch(requestFetchNotReadNotificationNumber())
  }, [])

  if (!currentGroupId) {
    return <Loading size="small"/>
  }

  const visibleCommnets = comments.filter(comment => comment.groupId === currentGroupId)

  const commentList = visibleCommnets.map(comment => ( 
    <RecordCommentItem 
      key={comment.id} 
      comment={comment} 
      requestDeleteRecordComment={requestDeleteRecordComment}
    />
  ))

  return (
    <CommnetListWrapper commentPresent={visibleCommnets.length}>
      {
        visibleCommnets.length ? 
        <CommentListTitle>コメント {visibleCommnets.length}件</CommentListTitle>
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
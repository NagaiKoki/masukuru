import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import moment from '../../../config/moment'
// import types
import { RecordCommentType } from '../../../types/Record'
// import apis
import { requestFetchUser } from '../../../apis/Users'
// import constants
import { COLORS } from '../../../constants/Styles'
// import components
import UserImage from '../../Image/userImage'
// import lib
import { convertTimestampToString } from '../../../lib/timestamp'

interface RecordCommentListProps {
  comment: RecordCommentType
}

const RecordCommentItem = (props: RecordCommentListProps) => {
  const { comment } = props
  const { uid, content, createdAt } = comment

  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const { user, error }: { user?: any, error?: string } = await requestFetchUser(uid)
      if (user && !error) {
        setUser(user)
      } else {
        setError(error)
      }
    }
    fetchUser()
  }, [])

  const dateTime = () => {
    // コメントを送った直後のcreatedAtの型はfirestore.timeStamp型にならないため
    // Date型として扱う
    if (createdAt instanceof Date) {
      return moment(convertTimestampToString(undefined, createdAt)).fromNow()
    } else {
      return moment(convertTimestampToString(createdAt, undefined)).fromNow()
    }
  }

  if (!user || !comment) {
    return <React.Fragment></React.Fragment>
  }

  const renderUserImage = (
    <RecordUserWrapper>
      <UserImage uri={user.imageUrl} width={30} height={30} borderRadius={60} />
    </RecordUserWrapper>
  )
 
  return (
    <CommentItemContainer>
      <CommnetItemWrapper>
        {renderUserImage}
        <CommentContentWrapper>
          <CommentUserName>{user.name}</CommentUserName>
          <CommentItemContent>{content}</CommentItemContent>
         </CommentContentWrapper>
       </CommnetItemWrapper>
      <CommentTimeStampText>{dateTime()}</CommentTimeStampText>
    </CommentItemContainer>
  )
}

const CommentItemContainer = styled.View`
  margin: 10px;
`

const CommnetItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

const RecordUserWrapper = styled.View` 
  margin-right: 10px;
`

const CommentContentWrapper = styled.View`
  background-color: ${COLORS.COMMENT_BACKGROUND};
  padding: 10px 15px;
  border-radius: 10px;
`

const CommentUserName = styled.Text`
  margin-bottom: 5px;
  color: black;
  font-size: 11px;
  font-weight: bold;
`

const CommentItemContent = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
`

const CommentTimeStampText = styled.Text`
  margin-left: 50px;
  margin-top: 7px;
  color: ${COLORS.SUB_BLACK};
  font-size: 10px;
`


export default RecordCommentItem;
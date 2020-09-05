import React, { useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useFocusEffect } from '@react-navigation/native';
// import types
import { ResponseRecordType } from '../../../../types/Record'
// import components
import RecordItem from '../../../../components/Records/Items/item'
import RecordCommentForm from '../../../../components/Records/Reactions/Comments/form'
import RecordCommentList from '../../../../components/Records/Reactions/Comments/commentList'
import Loading from '../../../../components/Loading'
import { COLORS } from '../../../../constants/Styles'
// import config
import firebase from '../../../../config/firebase'
// import selectors
import userSelector from '../../../../selectors/user'
import recordSelector from '../../../../selectors/record'
// import slice
import {
  requestPostRecordComment,
  requestFetchRecordComments,
  requestDeleteRecordComment,
} from '../../../../slice/record'
// import actions
import { requestFetchUserData } from '../../../../actions/User'

const RecordShowScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { comments, isLoading } = recordSelector()
  const { currentUser } = userSelector()
  const { record }: { record: ResponseRecordType, notificationGroupId?: string } = route.params
  const scrollRef = useRef(null)

  useFocusEffect(
    useCallback(() => {
      dispatch(requestFetchRecordComments(record.id))
      if (!currentUser) {
        dispatch(requestFetchUserData(firebase.auth().currentUser.uid))
      }
    }, [])
  )

  if (!currentUser) {
    return <Loading size="small" /> 
  }

  const renderCommentList = isLoading ? <Loading size="small" /> 
    : <RecordCommentList 
        comments={comments}
        requestDeleteRecordComment={requestDeleteRecordComment} 
      />

  return (
    <RecordShowContainer>
      <RecordShowWrapper 
        ref={scrollRef}
        onContentSizeChange={() => scrollRef.current.scrollToEnd({ animated: true})}>
        <RecordItem 
          record={record}
          navigation={navigation}
          isShowPage={true} 
        /> 
        {renderCommentList}    
      </RecordShowWrapper>
      <RecordCommentForm
        record={record}
        currentUser={currentUser}
        requestPostRecordComment={requestPostRecordComment}
      />
    </RecordShowContainer>
  )
}

const RecordShowContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const RecordShowWrapper = styled.ScrollView`
  margin-bottom: 40px;
`

export default RecordShowScreen;
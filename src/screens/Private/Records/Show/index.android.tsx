import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { useFocusEffect } from '@react-navigation/native';
// import types
import { RecordShowProps } from '../../../../containers/Private/records/recordShow'
import { ResponseRecordType } from '../../../../types/Record'
// import components
import RecordItem from '../../../../components/Records/Items/item'
import RecordComment from '../../../../components/Records/Comments/form'
import RecordCommentList from '../../../../components/Records/Comments/commentList'
import Loading from '../../../../components/Loading'
import { COLORS } from '../../../../constants/Styles'
// import config
import firebase from '../../../../config/firebase'

const RecordShowScreen = (props: RecordShowProps) => {
  const { navigation, route, records, users, actions } = props
  const {
    requestFetchUserData,
     requestDestroyRecord, 
     changeRecordCommentText, 
     requestPostRecordComment,
     requestFetchRecordComments,
     requestDeleteRecordComment
  } = actions
  const { currentUser } = users
  const { temporaryComment, comments, isLoading } = records
  const { record }: { record: ResponseRecordType } = route.params
  const scrollRef = useRef(null)

  useFocusEffect(
    useCallback(() => {
      requestFetchRecordComments(record.id)
      if (!currentUser) {
        requestFetchUserData(firebase.auth().currentUser.uid)
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
          requestDestroyRecord={requestDestroyRecord} 
        /> 
        {renderCommentList}    
      </RecordShowWrapper>
      <RecordComment
        record={record}
        currentUser={currentUser}
        temporaryComment={temporaryComment}
        changeRecordCommentText={changeRecordCommentText}
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
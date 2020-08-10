import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { useFocusEffect } from '@react-navigation/native';
// import types
import { RecordShowProps } from '../../../../containers/Private/records/recordShow'
import { ResponseRecordType } from '../../../../types/Record'
// import components
import RecordItem from '../../../../components/Records/recordItem'
import RecordCommentForm from '../../../../components/Records/Comments/form'
import RecordCommentList from '../../../../components/Records/Comments/commentList'
import Loading from '../../../../components/Loading'
import { COLORS } from '../../../../constants/Styles'

const RecordShowScreen = (props: RecordShowProps) => {
  const { navigation, route, records, users, actions } = props
  const {
     requestDestroyRecord, 
     changeRecordCommentText, 
     requestPostRecordComment,
     requestFetchRecordComments,
     requestDeleteRecordComment,
     requestPostPushNotification
  } = actions
  const { temporaryComment, comments, isLoading } = records
  const { currentUser } = users
  const { record, notificationGroupId }: { record: ResponseRecordType, notificationGroupId?: string } = route.params
  const scrollRef = useRef(null)

  useFocusEffect(
    useCallback(() => {
      requestFetchRecordComments(record.id)
    }, [])
  )

  const renderCommentList = isLoading ? <Loading size="small" /> 
    : <RecordCommentList 
        comments={comments}
        requestDeleteRecordComment={requestDeleteRecordComment}
        notificationGroupId={notificationGroupId}
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
      <RecordShowCommentFormWrapper 
        style={{ flex: 1 }} 
        behavior="padding" 
        keyboardVerticalOffset={90}
      >
        <RecordCommentForm
          record={record}
          currentUser={currentUser}
          temporaryComment={temporaryComment}
          notificationGroupId={notificationGroupId}
          changeRecordCommentText={changeRecordCommentText}
          requestPostRecordComment={requestPostRecordComment}
          requestPostPushNotification={requestPostPushNotification}
      />
      </RecordShowCommentFormWrapper>
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

const RecordShowCommentFormWrapper = styled.KeyboardAvoidingView`
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${COLORS.BASE_WHITE};
`

export default RecordShowScreen;
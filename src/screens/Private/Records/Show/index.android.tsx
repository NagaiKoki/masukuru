import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { useFocusEffect } from '@react-navigation/native';
// import types
import { RecordShowProps } from '../../../../containers/Private/records/recordShow'
// import components
import RecordItem from '../../../../components/Records/recordItem'
import RecordComment from '../../../../components/Records/Comments/form'
import RecordCommentList from '../../../../components/Records/Comments/commentList'
import Loading from '../../../../components/Loading'
import { COLORS } from '../../../../constants/Styles'

const RecordShowScreen = (props: RecordShowProps) => {
  const { navigation, route, records, actions } = props
  const {
     requestDestroyRecord, 
     changeRecordCommentText, 
     requestPostRecordComment,
     requestFetchRecordComments,
     requestDeleteRecordComment
  } = actions
  const { temporaryComment, comments, isLoading } = records
  const { record } = route.params
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
        recordId={record.id}
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
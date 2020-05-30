import React from 'react'
import styled from 'styled-components'
// import types
import { RecordShowProps } from '../../../../containers/Private/records/recordShow'
// import components
import RecordItem from '../../../../components/Records/recordItem'
import RecordComment from '../../../../components/Records/comment'
import { COLORS } from '../../../../constants/Styles'

const RecordShowScreen = (props: RecordShowProps) => {
  const { navigation, route, records, actions } = props
  const { requestDestroyRecord, changeRecordCommentText, requestPostRecordComment } = actions
  const { temporaryComment } = records
  const { record } = route.params

  return (
    <RecordShowContainer>
      <RecordItem 
        record={record} 
        requestDestroyRecord={requestDestroyRecord} 
      />    
      <RecordShowCommentWrapper 
        style={{ flex: 1 }} 
        behavior="padding" 
        keyboardVerticalOffset={90}
      >
        <RecordComment
          recordId={record.id}
          temporaryComment={temporaryComment}
          changeRecordCommentText={changeRecordCommentText}
          requestPostRecordComment={requestPostRecordComment}
        />
      </RecordShowCommentWrapper>
    </RecordShowContainer>
  )
}

const RecordShowContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const RecordShowCommentWrapper = styled.KeyboardAvoidingView`
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${COLORS.BASE_WHITE};
`

export default RecordShowScreen;
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ScrollView } from 'react-native';
// import types
import { RecordItemType } from '../../../types/Record'
// import selectors
import { useUserRecords, useRecordIsLoading, useSelectRecordActions } from '../../../selectors/record'
// import components
import Loading from '../../Loading'
import Items from './Items'
// import config
import firebase from '../../../config/firebase'
// import utils
import { isCloseToBottom } from '../../../utilities/scrollBottomEvent'

type Props = {
  selectedRecords: RecordItemType[]
  handleSelectedRecords: (record: RecordItemType) => void
}

const RecordHistoryList = (props: Props) => {
  const { selectedRecords, handleSelectedRecords } = props
  const isLoading = useRecordIsLoading()
  const records = useUserRecords()
  const uid = firebase.auth().currentUser.uid
  const { requestFetchRecords, requestNextRecords } = useSelectRecordActions()

  useEffect(() => {
    requestFetchRecords({ uid: uid, groupId: undefined, size: 15 })
  }, [])

  if (!records || !records.length) {
    return <></>
  }

  const lastRecord = records[records.length - 1]
  const selectedRecordIds = selectedRecords.map(record => record.id)

  const historyList = records.map((record , i) => (
    <Items key={i} record={record} selectedRecordIds={selectedRecordIds} handleSelectedRecords={handleSelectedRecords} />
  ))

  const handleRequestNextRecords = () => {
    requestNextRecords({ lastRecord, uid: uid, groupId: undefined })
  }
  
  return (
    <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent, 20) && records.length >= 15) {
            handleRequestNextRecords()
          }
        }}
        scrollEventThrottle={200}
      >
      {historyList}
      { isLoading ? <Loading size="small" /> : null }
    </ScrollView>
  )
}

export default RecordHistoryList

const Container = styled.View``
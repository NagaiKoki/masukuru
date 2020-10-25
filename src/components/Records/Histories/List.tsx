import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ScrollView } from 'react-native';
// import selectors
import { useUserRecords, useRecordIsLoading, useSelectRecordActions } from '../../../selectors/record'
// import components
import Loading from '../../Loading'
import Item from './Item'
// import config
import firebase from '../../../config/firebase'
// import utils
import { isCloseToBottom } from '../../../utilities/scrollBottomEvent'

type Props = {

}

const RecordHistoryList = (props: Props) => {
  const isLoading = useRecordIsLoading()
  const records = useUserRecords()
  const uid = firebase.auth().currentUser.uid
  const [recordsSize, setRecordsSize] = useState(0)
  const { requestFetchRecords, requestNextRecords } = useSelectRecordActions()

  useEffect(() => {
    requestFetchRecords({ uid: uid, groupId: undefined, size: 15 })
  }, [])

  if (!records || !records.length) {
    return <></>
  }

  const lastRecord = records[records.length - 1]

  const historyList = records.map((record , i) => (
    <Item key={i} record={record} />
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
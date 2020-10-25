import React, { useEffect } from 'react'
import styled from 'styled-components'
// import selectors
import { useUserRecords, useRecordIsLoading, useSelectRecordActions } from '../../../selectors/record'
// import components
import Loading from '../../Loading'
import Item from './Item'
// import config
import firebase from '../../../config/firebase'

type Props = {

}

const RecordHistoryList = (props: Props) => {
  const isLoading = useRecordIsLoading()
  const records = useUserRecords()
  const { requestFetchRecords } = useSelectRecordActions()

  useEffect(() => {
    requestFetchRecords({ uid: firebase.auth().currentUser.uid, groupId: undefined })
  }, [])

  if (isLoading) {
    return <Loading size="small" />
  }

  const historyList = records.map((record , i) => (
    <Item key={i} record={record} />
  ))
  
  return (
    <Container>
      {historyList}
    </Container>
  )
}

export default RecordHistoryList

const Container = styled.View``
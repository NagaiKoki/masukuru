import React from 'react'
// import components
import Item from './Item'
// import types
import { RecordItemType, ResponseRecordType } from '../../../types/Record'

type Props = {
  selectedRecordIds: number[]
  record: ResponseRecordType
  handleSelectedRecords: (record: RecordItemType) => void
}

const RecordHistoryItems = (props: Props) => {
  const { selectedRecordIds, record, handleSelectedRecords } = props
  const { createdAt, records } = record

  if (!records || !records.length) return <></>

  const items = records.map(record => (
    <Item 
      key={record.id} 
      selectedRecordIds={selectedRecordIds} 
      recordItem={record}
      createdAt={createdAt} 
      handleSelectedRecords={handleSelectedRecords} 
    />
  ))

  return ( 
    <>{items}</>
  )
}

export default RecordHistoryItems
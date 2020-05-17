import React from 'react'
import styled from 'styled-components'
// import types
import { ResponseRecordType } from '../../types/Record'
// import components
import RecordItem from './recordItem'

interface RecordListProps {
  recordData: ResponseRecordType[]
}

const RecordList = (props: RecordListProps) => {
  const { recordData } = props

  const renderRecordList = recordData.map((record: ResponseRecordType) => {
    return <RecordItem key={record.id} record={record} />
  })

  return (
    <RecordListContainer>
      {renderRecordList}
    </RecordListContainer>
  )
}

const RecordListContainer = styled.View`

`

export default RecordList
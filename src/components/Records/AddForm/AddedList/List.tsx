import React from 'react'
import styled from 'styled-components'
// import components
import Item from './Item'
// import types
import { RecordItemType } from '../../../../types/Record'

type Props = {
  recordItems: RecordItemType[]
  onNavigate: (record: RecordItemType) => void
  onDelete: (record: RecordItemType) => void
}

const AddTrainingList = (props: Props) => {
  const { recordItems, onNavigate, onDelete } = props

  const recordList = recordItems.map(record => (
    <Item 
      key={record.id} 
      recordItem={record} 
      onNavigate={onNavigate}
      onDelete={onDelete}
    />
  ))

  return (
    <Wrapper>
      {recordList}
    </Wrapper>
  )
}

export default AddTrainingList

const Wrapper = styled.View``
import React from 'react';
import styled from 'styled-components'
// import types
import { ResponseRecordType } from '../../types/Record'

interface RecordItemProps {
  record: ResponseRecordType
}

const RecordItem = (props: RecordItemProps) => {
  const { record } = props
  const { id, uid, records, word, createdAt } = record

  return (
    <RecordItemContainer>
      <RecordWordText>{word}</RecordWordText>
    </RecordItemContainer>
  )
}

const RecordItemContainer = styled.View`
`

const RecordWordWrapper = styled.View`

`

const RecordWordText = styled.Text`

`

export default RecordItem
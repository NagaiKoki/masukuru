import React from 'react'
import styled from 'styled-components'
// import types
import { ResponseRecordType } from '../../../types/Record'

type Props = {
  record: ResponseRecordType
}

const RecordHistoryItem = (props: Props) => {
  const { record } = props

  return (
    <Wrapper>
      <Text>{record.uid}</Text>
    </Wrapper>
  )
}

export default RecordHistoryItem

const Wrapper = styled.TouchableOpacity``

const Text = styled.Text``
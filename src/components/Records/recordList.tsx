import React from 'react'
import styled from 'styled-components'
// import types
import { ResponseRecordType } from '../../types/Record'
// import components
import RecordItem from './recordItem'
import Loading from '../Loading'
import { COLORS } from '../../constants/Styles'

interface RecordListProps {
  recordData: ResponseRecordType[]
  isLoading: boolean
}

const RecordList = (props: RecordListProps) => {
  const { recordData, isLoading } = props

  const renderRecordList = recordData.map((record: ResponseRecordType, i: number) => {
    return <RecordItem key={i} record={record} />
  })

  return (
    <RecordListContainer>
      { !isLoading && !recordData.length ? (
        <RecordEmptyState>トレーニングをして、記録を追加しよう！</RecordEmptyState>
      ) : renderRecordList
      }
      { isLoading ? <Loading size="small" /> : null }
    </RecordListContainer>
  )
}

const RecordListContainer = styled.View`
`

const RecordEmptyState = styled.Text`
  padding: 40px 0;
  text-align: center;
`

export default RecordList
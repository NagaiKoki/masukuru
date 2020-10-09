import React from 'react'
import styled from 'styled-components'
// import types
import { ResponseRecordType } from '../../types/Record'
// import components
import RecordItem from './Items/item'
import Loading from '../Loading'
import EmptyState from '../../common/EmptyState'

interface RecordListProps {
  recordData: ResponseRecordType[]
  isLoading: boolean
  navigation?: any
  requestDestroyRecord: (id: string) => void
}

const RecordList = (props: RecordListProps) => {
  const { recordData, isLoading, navigation } = props

  const EMPTY_TEXT = 'まだ記録がありません。\n\右下のボタンから、トレーニングの記録を付けてみよう！'

  const renderRecordList = recordData.map((record: ResponseRecordType, i: number) => {
    return <RecordItem 
              key={i} 
              record={record} 
              navigation={navigation} 
            />
  })

  return (
    <RecordListContainer>
      { !isLoading && !recordData.length ? (
        <EmptyState text={EMPTY_TEXT} />
      ) : renderRecordList
      }
      { isLoading ? <Loading size="small" /> : null }
    </RecordListContainer>
  )
}

const RecordListContainer = styled.View`
  padding: 10px 0;
`

export default RecordList
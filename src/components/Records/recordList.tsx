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
  navigation?: any
  requestDestroyRecord: (id: string) => void
}

const RecordList = (props: RecordListProps) => {
  const { recordData, isLoading, navigation, requestDestroyRecord } = props

  const renderRecordList = recordData.map((record: ResponseRecordType, i: number) => {
    return <RecordItem 
              key={i} 
              record={record} 
              navigation={navigation} 
              requestDestroyRecord={requestDestroyRecord}
            />
  })

  return (
    <RecordListContainer>
      { !isLoading && !recordData.length ? (
        <RecordEmptyState>表示するトレーニングはまだありません。{"\n"}{"\n"}右下のボタンからトレーニングの記録を共有しよう！</RecordEmptyState>
      ) : renderRecordList
      }
      { isLoading ? <Loading size="small" /> : null }
    </RecordListContainer>
  )
}

const RecordListContainer = styled.View`
  padding: 10px 0;
`

const RecordEmptyState = styled.Text`
  padding: 40px 0;
  text-align: center;
  font-size: 14px;
`

export default RecordList
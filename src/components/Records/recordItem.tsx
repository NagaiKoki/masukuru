import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
// import types
import { ResponseRecordType, RecordItemType } from '../../types/Record'
// import apis
import { requestFetchUser } from '../../apis/Users'
// import components
import UserImage from '../Image/userImage'
// import lib
import { convertTimestampToString } from '../../lib/timestamp'
import { COLORS } from '../../constants/Styles';

interface RecordItemProps {
  record: ResponseRecordType
}

const RecordItem = (props: RecordItemProps) => {
  const { record } = props
  const { id, uid, records, word, createdAt } = record

  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const { user, error }: { user?: any, error?: string } = await requestFetchUser(uid)
      if (user && !error) {
        setUser(user)
      } else {
        setError(error)
      }
    }
    fetchUser()
  }, [])

  if (!user) {
    return <RecordItemContainer></RecordItemContainer>
  }

  // 記録の詳細
  const renderUnitData = (record: RecordItemType) => {
    if (record.isMuscle) {
      const amounts = record.amounts
      const weights = record.weights
      let components = []
      for(let size = 1; size <= amounts.length; size++) {
         components.push(<UnitData key={size}>{ amounts[size - 1] + '回' }{ weights[size - 1] ? '×' + weights[size - 1] + 'kg' : null}</UnitData>)
      }
      return components
    } else if (record.isMuscle === false) {
      const time = record.time
      const distance = record.distance
      return (
        <UnitDataItem>
          <UnitData>{time ? time + '分' : null}</UnitData>
          <UnitData>{distance ? distance + 'km' : null}</UnitData>
        </UnitDataItem>
      )
    }
  }

  // 記録
  const renderRecordData = records.map((record: RecordItemType, i: number) => {
    return (
      <RecordDataWrapper key={i}>
        <RecordDataName>{record.name}</RecordDataName>
        <UnitDataWrapper>
          {renderUnitData(record)}
        </UnitDataWrapper>
      </RecordDataWrapper>
    )
  })

  // ユーザーレンダー
  const renderUser = 
      <RecordUserWrapper>
        <RecordUserImage>
          <UserImage user={user} width={40} height={40} borderRadius={60} />
        </RecordUserImage>
        <RecordUserName>{user.name}</RecordUserName>
      </RecordUserWrapper>

  return (
    <RecordItemContainer>
      <RecordItemUpper>
        {renderUser}
        <RecordTimestampText>{convertTimestampToString(record.createdAt)}</RecordTimestampText>
      </RecordItemUpper>
      <RecordWordText>{word}</RecordWordText>
      {renderRecordData}
    </RecordItemContainer>
  )
}

const RecordItemContainer = styled.View`
  margin: 8px 0;
  border-color: ${COLORS.BASE_BORDER_COLOR};
  padding: 15px 15px 0 15px;
  border-top-width: 0.5px;
  border-bottom-width: 0.5px;
  background-color: ${COLORS.BASE_WHITE}; 
`

const RecordItemUpper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const RecordUserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

const RecordUserImage = styled.View`
`

const RecordUserName = styled.Text`
  margin-left: 13px;
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 16px;
`

const RecordTimestampText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 12px;
`

const RecordWordText = styled.Text`
  padding: 15px 0;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
  margin-left: 50px;
`

const RecordDataWrapper = styled.View`
  border-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 0.5px;
  margin-left: 50px;
  padding: 15px 0;
`

const RecordDataName = styled.Text`
  font-weight: bold;
  font-size: 15px;
`

const UnitDataWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 0;
`

const UnitDataItem = styled.View`
`

const UnitData = styled.Text`
  padding: 5px 0;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
  margin-right: 10px;
`

export default RecordItem
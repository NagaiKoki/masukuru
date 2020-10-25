import React from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/AntDesign'
// import constants
import { COLORS } from '../../../constants/Styles'
// import types
import { ResponseRecordType } from '../../../types/Record'
// import utils
import { historyRecordParse } from '../../../utilities/Record/historyParse'
import { convertTimeStampToStringOnlyMonthAndDate } from '../../../utilities/timestamp'
import truncateText from '../../../utilities/truncateText'

type Props = {
  record: ResponseRecordType
}

const RecordHistoryItem = (props: Props) => {
  const { record } = props
  const { createdAt, records } = record
  const text = historyRecordParse(record)

  if (!records || !records.length) return <></>

  return (
    <Wrapper activeOpacity={0.8}>
      <TextWrapper>
        <Timestamp>{convertTimeStampToStringOnlyMonthAndDate(createdAt, undefined)}</Timestamp>
        <Text>{truncateText(text, 20)}</Text>
      </TextWrapper>
      <Icon name="checkcircle" size={25} style={{ color: COLORS.BASE_MUSCLEW, width: '8%' }} />
    </Wrapper>
  )
}

export default RecordHistoryItem

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 0.5px;
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
  padding: 10px;
`

const TextWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 90%;
`

const BaseText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
`

const Timestamp = styled(BaseText)`
  margin-right: 10px;
`

const Text = styled(BaseText)`
`
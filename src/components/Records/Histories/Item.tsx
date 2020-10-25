import React from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/AntDesign'
// import constants
import { COLORS } from '../../../constants/Styles'
// import types
import { RecordItemType } from '../../../types/Record'
// import utils
import { historyRecordParse } from '../../../utilities/Record/historyParse'
import { convertTimeStampToStringOnlyMonthAndDate } from '../../../utilities/timestamp'
import truncateText from '../../../utilities/truncateText'
// import config
import firebase from '../../../config/firebase'

type Props = {
  selectedRecordIds: number[]
  recordItem: RecordItemType
  createdAt: firebase.firestore.Timestamp
  handleSelectedRecords: (recordItem: RecordItemType) => void
}

const RecordHistoryItem = (props: Props) => {
  const { selectedRecordIds, recordItem, createdAt, handleSelectedRecords } = props

  const text = historyRecordParse(recordItem)

  const isSelected = selectedRecordIds.some(id => id === recordItem.id)

  return (
    <Wrapper activeOpacity={0.8} onPress={() => handleSelectedRecords(recordItem)}>
    <TextWrapper>
      <Timestamp>{convertTimeStampToStringOnlyMonthAndDate(createdAt, undefined)}</Timestamp>
      <Text>{truncateText(text, 25)}</Text>
    </TextWrapper>
    <Icon name="checkcircle" size={25} style={{ color: isSelected ? COLORS.BASE_MUSCLEW : COLORS.SUB_BACKGROUND, width: '8%' }} />
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
`

const Timestamp = styled(BaseText)`
  margin-right: 15px;
  font-size: 16px;
`

const Text = styled(BaseText)`
  font-size: 14px;
`
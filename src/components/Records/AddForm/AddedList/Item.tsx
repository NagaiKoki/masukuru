import React from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../../../constants/Styles'
// import types
import { RecordItemType } from '../../../../types/Record'
// import utils
import { parseRecord } from '../../../../utilities/Record/recordParse'
import truncateText from '../../../../utilities/truncateText'
import { handleAlert } from '../../../../utilities/Alert'

type Props = {
  recordItem: RecordItemType
  onNavigate: (record: RecordItemType) => void
  onDelete: (record: RecordItemType) => void
}

const AddListItem = (props: Props) => {
  const { recordItem, onNavigate, onDelete } = props
  const text = parseRecord(recordItem)
  const truncatedText = text.length >= 17 ? truncateText(text, 17) + '...' : text

  const handleOnDelete = () => {
    handleAlert("このトレーニングを削除します。", "本当によろしいですか？", "OK", onDelete)(recordItem)
  }

  return (
    <Wrapper>
      <TrButton activeOpacity={0.8} onPress={() => onNavigate(recordItem)}>
        <TrButtonText>{truncatedText}</TrButtonText>
        <Icon name="edit" size={16} style={{ color: COLORS.BASE_BLACK }} />
      </TrButton>
      <DeleteButton onPress={handleOnDelete}>
        <DeleteText>削除</DeleteText>
      </DeleteButton>
    </Wrapper>
  )
}

export default AddListItem

const Wrapper = styled.View`
  margin: 8px 0;
`

const TrButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  background: ${COLORS.FORM_BACKGROUND2};
`

const TrButtonText = styled.Text`
  font-size: 16px;
  color: ${COLORS.BASE_BLACK};
`

const DeleteButton = styled.TouchableOpacity` 
  align-self: flex-end;
  padding: 5px;
  width: 40px;
`

const DeleteText = styled.Text`
  color: ${COLORS.SUB_BLACK};
  font-size: 14px;
`
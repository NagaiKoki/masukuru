import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/Styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { Alert } from 'react-native'
// import types
import { RecordProps } from '../../../containers/record'
import { RecordItemType } from '../../../types/Record'
// import lib
import truncateText from '../../../lib/truncateText'

const RecordModalScreen = (props: RecordProps) => {
  const { 
    actions, 
    records,
    navigation 
  } = props
  const {  recordItems } = records
  const { deleteRecord } = actions
  
  // 記録フォームへ遷移
  const handleNavigateAddForm = () => {
    navigation.navigate('addRecordModal')
  }

  // 記録の削除
  const handleDeleteRecordItem = (record: RecordItemType) => {
    deleteRecord(record)
  }

  const renderRecordItems = () => {
    const recordsComponent = recordItems.map((item: RecordItemType) => {
      const renderAmountText = item.amounts.join('回, ')
      const renderWeightText = item.weights.join('kg, ')
      const rednerText = item.name + ', ' + renderAmountText + renderWeightText

      return (
        <React.Fragment key={item.id}>
          <RecordItemBtn>
            <RecordItemText>{truncateText(rednerText, 30)}...</RecordItemText>
            <Icon name="edit" size={16} style={{ color: COLORS.BASE_BLACK }} />
          </RecordItemBtn>
          <RecordDeleteBtn onPress={ () => handleDeleteRecordItem(item)}>
            <RecordItemDelete>削除</RecordItemDelete>
          </RecordDeleteBtn>
        </React.Fragment>
      )
    })
    return recordsComponent
  }

  console.log(recordItems)

  return (
    <RecordModalContainer >
      <RecordModalTitle>トレーニングお疲れ様でした♪</RecordModalTitle>
      { recordItems.length ? 
      <React.Fragment>
        {renderRecordItems()}
        <RecordNewAddItemBtn onPress={handleNavigateAddForm}>
          <Icon name="plus" size={25} style={{ color: COLORS.BASE_BLACK }} />
          <RecordNewAddItemBtnText>トレーニングの記録を追加する</RecordNewAddItemBtnText>
        </RecordNewAddItemBtn> 
      </React.Fragment>
      :
      <React.Fragment>
        <RecordModalAddItemBtnForm onPress={handleNavigateAddForm}>
          <Icon name="pluscircleo" size={16} style={{ color: COLORS.SUB_BLACK }} />
          <RecordItemText>トレーニングを追加する</RecordItemText>
        </RecordModalAddItemBtnForm>
      </React.Fragment>
      }
    </RecordModalContainer>
  )
}

export default RecordModalScreen;

const RecordModalContainer = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
  padding: 30px 10px;
`

const RecordModalTitle = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin: 30px 0 20px 0;
`

const RecordModalAddItemBtnForm = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${COLORS.FORM_BACKGROUND};
  width: 90%;
  margin: 20px auto;
  border-radius: 5px;
  padding: 15px;
`

const RecordItemBtn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: ${COLORS.FORM_BACKGROUND};
  width: 90%;
  margin: 0px auto;
  border-radius: 5px;
  padding: 15px;
`

const RecordItemText = styled.Text`
  margin-left: 10px;
  color: ${COLORS.SUB_BLACK};
  font-size: 16px;
`

const RecordItemDelete = styled.Text`
  width: 90%;
  align-self: center;
  margin: 10px 5px 15px 0;
  text-align: right;
  color: ${COLORS.SUB_BLACK};
  font-size: 14px;
`

const RecordNewAddItemBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 90%;
  margin: 10px auto;
`

const RecordNewAddItemBtnText = styled.Text`
  margin-left: 10px;
  font-size: 18px;
  color: ${COLORS.BASE_BLACK};
`

const RecordDeleteBtn = styled.TouchableOpacity``

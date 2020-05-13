import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/Styles';
import Icon from 'react-native-vector-icons/AntDesign';
// import types
import { RecordProps } from '../../../containers/record'

const RecordModalScreen = (props: RecordProps) => {
  console.log(props)
  const { actions, records, navigation } = props
  const { recordItems } = records
  const { addRecord } = actions

  return (
    <RecordModalContainer>
      <RecordModalTitle>トレーニングお疲れ様でした♪</RecordModalTitle>
      <RecordModalAddItemBtnForm onPress={ () => navigation.push('addRecordModal') }>
        <Icon name="pluscircleo" size={16} style={{ color: COLORS.SUB_BLACK }} />
        <RecordModalAddItemText>トレーニングを追加する</RecordModalAddItemText>
      </RecordModalAddItemBtnForm>


      <RecordNewAddItemBtn onPress={ () => navigation.navigate('addRecordModal') }>
        <Icon name="plus" size={25} style={{ color: COLORS.BASE_BLACK }} />
        <RecordNewAddItemBtnText>トレーニングの記録を追加する</RecordNewAddItemBtnText>
      </RecordNewAddItemBtn>

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

const RecordModalAddItemText = styled.Text`
  margin-left: 10px;
  color: ${COLORS.SUB_BLACK};
  font-size: 16px;
`

const RecordNewAddItemBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const RecordNewAddItemBtnText = styled.Text`
  margin-left: 10px;
  font-size: 18px;
  color: ${COLORS.BASE_BLACK};
`

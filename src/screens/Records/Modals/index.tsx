import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/Styles';

const RecordModalScreen = ({ navigation }) => {
  return (
    <RecordModalContainer>
      <RecordModalTitle>今日</RecordModalTitle>
      <RecordModalAddItemBtn onPress={ () => navigation.navigate('addRecordModal') }>
        <RecordModalAddItemText>トレーニングを追加する</RecordModalAddItemText>
      </RecordModalAddItemBtn>
    </RecordModalContainer>
  )
}

export default RecordModalScreen;

const RecordModalContainer = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
  padding-top: 100px;
`

const RecordModalAddItemBtn = styled.TouchableOpacity``

const RecordModalAddItemText = styled.Text`
`

const RecordModalTitle = styled.Text`
`
import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/Styles';

const RecordModalScreen = () => {
  return (
    <RecordModalContainer>
      <RecordModalTitle>今日</RecordModalTitle>
    </RecordModalContainer>
  )
}

export default RecordModalScreen;

const RecordModalContainer = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const RecordModalTitle = styled.Text`
`
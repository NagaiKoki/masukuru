import React from 'react';
import { ScrollView } from 'react-native'
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
// import components
import Event from '../../components/Events'


const RecordScreen = ({ navigation }) => {
  return (
    <RecordContainer>
      <EventView>
        <ScrollView>
          <Event navigation={navigation}/>
        </ScrollView>
      </EventView>
    </RecordContainer>
  )
}

const RecordContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const EventView = styled.View`
`

export default RecordScreen
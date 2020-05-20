import React, { useState } from 'react';
import { ScrollView } from 'react-native'
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import Icon from 'react-native-vector-icons/AntDesign';
// import components
import Event from '../../components/Events'

const RecordScreen = ({ navigation }) => {	
  const [eventModal, setEventModal] = useState(false);

  return (	  
    <RecordContainer>
      <ScrollView>
      <EventView>	
        <Event navigation={navigation} eventModal={eventModal} setEventModal={setEventModal}/>	
      </EventView>	
      </ScrollView>
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
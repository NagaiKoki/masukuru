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
      <EventAddBtn onPress={() => setEventModal(true)}>
        <Icon name="plus" size={30} style={{ color: '#fff', marginTop: 4 }} />
      </EventAddBtn>
    </RecordContainer>
  )
}

const RecordContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const EventView = styled.View`
`

const EventAddBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  border-radius: 60px;
  height: 60px;
  width: 60px;
  position: absolute;
  bottom: 10%;
  right: 5%;
`

export default RecordScreen
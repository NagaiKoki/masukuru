import React from 'react'
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';


const MyPageScreen = ({ navigation }) => {

  return (
    <Container>
      <User>

      </User>
      <EventHistoryTitle>
        トレーニング履歴
      </EventHistoryTitle>
      <EventHistoryList>
        <EventHistory>

        </EventHistory>
      </EventHistoryList>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 20px;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const User = styled.View`
  height: 100px;
  background: #FFF; 
`

const EventHistoryTitle = styled.Text`
padding-left: 50px;
padding-top: 30px;
height: 50px;
`

const EventHistoryList = styled.View`
  padding: 0 15px;
`

const EventHistory = styled.View`
`

export default MyPageScreen;
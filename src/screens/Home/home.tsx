import React, { useState } from 'react'
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';

const HomeScreen = ({ navigation }) => {

  const numbers = [1, 2, 3, 4, 5]
  
  const [name, setname] = useState(0); 
  
  return (

    <Container>
      <Title>
        メンバー
      </Title>

      <Member>

      </Member>

      <EventTitle>
        トレーニング一覧
      </EventTitle>

      <EventList>
        <EventPlus>
          <EventPlusButton onPress={ () => navigation.navigate('Signup') }>
            <EventPlusButtonText>
              +
            </EventPlusButtonText>
          </EventPlusButton>
          <EventPlusText>
            トレーニングを追加する
          </EventPlusText>
        </EventPlus>
        
      </EventList>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 120px;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const Title = styled.Text`
  padding-left: 50px;
`

const Member = styled.View`
  background-color: #FFF;
  height: 60px;
`

const EventTitle = styled.Text`
  margin: 60px 0 30px 50px;
`

const EventList = styled.View`
  padding: 0 15px;
`

const EventPlus = styled.View`
  flex-direction: row;
  justify-content: space-around;
  height: 70px;
  background-color: #FFF;
  border-radius: 5px;
  align-items: center;
  box-shadow: 0 10px 6px ${COLORS.CARD_SHADOW1};
`

const EventPlusButton = styled.TouchableOpacity`
`

const EventPlusButtonText = styled.Text`
`

const EventPlusText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`

const Event = styled.View`
`

export default HomeScreen;
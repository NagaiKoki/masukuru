import React, { useState } from 'react'
import { Button } from 'react-native';
import styled from 'styled-components';
import {View,Button} from 'react-native';
import { COLORS } from '../../constants/Styles';
import EventAddModal from './EventAddModal'
import firebase from 'firebase';

const HomeScreen = ({ navigation }) => {
  
  const [name, setname] = useState(0);

  const UserSignOut = () => {
    firebase.auth().signOut();
  }

  const [showModal, setModal] = useState(false);

  return (

    <Container>
      <Title>
        メンバー
      </Title>
      <Button  onPress={()=> UserSignOut()} title='ログアウト' />
      <Member>

      </Member>

    <EventTitle>
        トレーニング一覧
      </EventTitle>

      <EventList>
        <EventPlus>
          <EventPlusButton onPress={ () => setModal(true) }>
            <EventPlusButtonText>
              +
            </EventPlusButtonText>
          </EventPlusButton>

          <ModalView>
            <EventModal
              animationType="slide"
              transparent={false}
              visible={showModal}
              >
              <ModalTitle>
                トレーニングを追加する
              </ModalTitle>

              <ButtonModal onPress={ () => setModal(false) } title="Close"></ButtonModal>
            </EventModal>
          </ModalView>


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

const ModalView = styled.View`
  
`

const EventModal = styled.Modal`
  
`

const ButtonModal = styled.Button`
  margin-top: 300px;
`

const ModalTitle = styled.Text`
  margin-top: 300px;
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
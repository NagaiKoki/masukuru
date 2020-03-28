import React, { useState, useEffect } from 'react'
import { Button, Text, AsyncStorage } from 'react-native';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import EventAddModal from './EventAddModal'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase, { db } from '../../config/firebase';

const HomeScreen = ({ navigation }) => {
  const [EventName, setEventName] = useState('');
  const [CurrentGroupId, setCurrentGroupId] = useState('');

  const current_user = firebase.auth().currentUser;
  const current_user_uid = current_user.uid

  useEffect(() => {
    db.collectionGroup("groupUsers").where('uid', '==', current_user_uid).limit(1)
      .get()
      .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          setCurrentGroupId(doc.ref.parent.parent.id);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  });
  
  const AddEvent = () => {
    db.collection('groups').doc(CurrentGroupId).collection('events').add({
      name: EventName,
      uid: current_user_uid
    }).then(function() {
      setModal(false);
    }).catch(function(error) {
      alert(error);
    })
  }

  const [showModal, setModal] = useState(false);

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
          <EventPlusButton onPress={ () => setModal(true) }>
            <EventPlusButtonText>
              +
            </EventPlusButtonText>
          </EventPlusButton>

          <Modal
            isVisible={showModal}
            >
            <ModalView>
              <ModalCloseButton onPress={ () => setModal(false) }>
                <Icon name="close" size={40}/>
              </ModalCloseButton>
              <EventAddForm 
                placeholder='名前を入力する（4文字以上）'
                autoCapitalize={'none'}
                autoCorrect={ false }
                onChangeText={ text => setEventName(text) }
              />
              <EventAddButton onPress={ () => AddEvent() }>
                <EventAddText>
                  追加する
                </EventAddText>
              </EventAddButton>
            </ModalView>
          </Modal>

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
  height: 300px;
  border-radius: 10px;
  background-color: #fff;
`

const EventModal = styled.Modal`
`

const ModalTitle = styled.Text`
`

const ModalCloseButton = styled.TouchableOpacity`
  align-self: flex-end;
`

const EventAddForm = styled.TextInput`
  background-color: ${COLORS.FORM_BACKGROUND};
  width: 90%;
  align-self: center;
  border-radius: 5px;
  padding: 20px 15px;
  margin: 40px 0;
`

const EventAddButton = styled.TouchableOpacity`
  width: 50%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 20px 0;
  border-radius: 5px;
  margin-top: 10px;
  opacity: ${ props => ( props.disabled ? 0.5 : 1 )};
`

const EventAddText = styled.Text`
  text-align: center;
  color: #fff;
  font-weight: bold;
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
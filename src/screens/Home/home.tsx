import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, Button, Text, AsyncStorage } from 'react-native';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import EventAddModal from './EventAddModal'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase, { db } from '../../config/firebase';

const HomeScreen = ({ navigation }) => {
  const [EventName, setEventName] = useState('');
  const [showModal, setModal] = useState(false);
  const [CurrentGroupId, setCurrentGroupId] = useState('');
  const [EventList, setEventList] = useState([])

  const current_user = firebase.auth().currentUser;
  const current_user_uid = current_user.uid

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth()+1;
  const date = today.getDate();

  useEffect(() => {
    db.collectionGroup("groupUsers").where('uid', '==', current_user_uid).limit(1)
      .get()
      .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          setCurrentGroupId(doc.ref.parent.parent.id);
          console.log(CurrentGroupId)
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }, [CurrentGroupId]);
  
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

  // const List = () => {
  //   db.collection('groups').doc('0vTTTGUtH0bmAbyk3MgQN44nTdS2').collection('events')
  //   .get()
  //   .then(function(querySnapshot) {
  //     // const List = querySnapshot.docs.map(doc => [doc.id, doc.data()])
  //     // const List2 = List.map(list => {id: list[0], name: list[1].name, })
  //     // const List2 = List.map(l => {})
  //     // console.log(List)
  //     // console.log(List[0])
  //     // console.log(List[1])

  //     return querySnapshot.docs.map(doc => doc.data())
  //     // setEventList(ListArray)
  //     // querySnapshot.forEach(function(doc) {
  //     //   // doc.data() is never undefined for query doc snapshots
  //     //   console.log(doc.id, " => ", doc.data());
  //     // });
  //   })
  //   .catch(function(error) {
  //     console.log("Error getting documents: ", error);
  //   })
  // }

  // useEffect(() => {
  //   const list = [];
  //   db.collection('groups').doc('0vTTTGUtH0bmAbyk3MgQN44nTdS2').collection('events')
  //   .get()
  //   .then(function(querySnapshot) {
  //     list.push(querySnapshot.docs.map(doc => doc.data()));
  //     setEventList(list)
  //     // console.log(ListArray)
  //     // setEventList(ListArray)
  //   })
  //   .catch(function(error) {
  //     console.log("Error getting documents: ", error);
  //   });
  // }, [EventList]);

  return (

    <Container>
      <MemberView>
        <MemberAddButton>
          <MemberAddPlus>
            +
          </MemberAddPlus>
        </MemberAddButton>
        <MemberAddText>
          招待する
        </MemberAddText>
      </MemberView>

      <RecentActivities>
        <RecentActivitiesText>
          直近の活動
        </RecentActivitiesText>
        <RecentActivitiesListView>
          <RecentActivitiesListDate>
            {year}/{month}/{date}
          </RecentActivitiesListDate>
          <RecentActivitiesList>

          </RecentActivitiesList>
          <RecentActivitiesListDetailButton>
            <RecentActivitiesListDetailText>
              もっと見る    <Icon name="angle-right" size={20} style={{ marginLeft: 'auto'  }}/>
            </RecentActivitiesListDetailText>
          </RecentActivitiesListDetailButton>
        </RecentActivitiesListView>
      </RecentActivities>

      <EventView>
        <EventPlus>
          <EventTitle>
            トレーニングリスト
          </EventTitle>

          <EventPlusButton onPress={ () => setModal(true) }>
            <EventPlusButtonText>
              + 追加する
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
        </EventPlus>

        {/* <EvetnListView>
          <EventFlatList 
            data={EventList}
            keyExtractor={(item) => (item.id)}
            renderItem={({item}) => 
              <View>
                <EventFlatListText>
                  {console.log(item.id, item.name, item.uid)}
                  {item.name}
                  {item.uid}
                </EventFlatListText>
              </View>
            }
          />

          
        </EvetnListView> */}

      </EventView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 120px;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const MemberView = styled.View`
  background-color: #FFF;
  height: 70px;
`

const MemberAddButton = styled.TouchableOpacity`
  position: relative;
  background-color: ${COLORS.BASE_MUSCLEW};;
  width: 40px;
  height: 40px;
  margin: 5px 15px 0 0;
  align-self: flex-end;
  border-radius: 50px;
`

const MemberAddPlus = styled.Text`
  position: absolute;
  top: 4px;
  left: 13px;
  color: #FFF;
  font-size: 25px;
`

const MemberAddText = styled.Text`
  align-self: flex-end;
  font-size: 10px;
  margin: 5px 15px 0 0;
`

const RecentActivities = styled.View`
  padding: 15px;
`

const RecentActivitiesText = styled.Text`
  margin-top: 10px;
  padding-left: 5px;
  font-size: 16px;
  font-weight: bold;
`

const RecentActivitiesListView = styled.View`
  margin-top: 20px;
  background-color: #FFF;
  height: 200px;
  border-radius: 5px;
  box-shadow: 10px 10px 6px ${COLORS.CARD_SHADOW1};
`

const RecentActivitiesListDate = styled.Text`
  margin: 10px;
  font-size: 15px;
  font-weight: bold;
`

const RecentActivitiesList = styled.View`
  height: 120px;
`

const RecentActivitiesListDetailButton = styled.TouchableOpacity`
`

const RecentActivitiesListDetailText = styled.Text`
  margin: 10px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  color: ${COLORS.BASE_MUSCLEW};;
`

const EventView = styled.View`
  padding: 0 15px;
`

const EventPlus = styled.View`
  margin: 60px 0 30px 0;
  flex-direction: row;
  justify-content: space-between;
`

const EventTitle = styled.Text`
  font-size: 15px;
  font-weight: bold;
`

const EventPlusButton = styled.TouchableOpacity`
`

const EventPlusButtonText = styled.Text`
`

const ModalView = styled.View`
  height: 300px;
  border-radius: 10px;
  background-color: #fff;
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

const EvetnListView = styled.View`
`

const EventFlatList = styled.FlatList`
`

const EventFlatListText = styled.Text`
  font-size: 16px;
  padding-top: 15px;
`


export default HomeScreen;
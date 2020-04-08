import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, Button, Text, AsyncStorage, ActivityIndicator, ScrollView } from 'react-native';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import EventAddModal from './EventAddModal'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase, { db } from '../../config/firebase';
import { List } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const [EventName, setEventName] = useState('');
  const [MemberModal, setMemberModal] = useState(false);
  const [EventModal, setEventModal] = useState(false);
  const [CurrentGroupId, setCurrentGroupId] = useState('');
  const [EventList, setEventList] = useState([]);

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
          SetsetEventList(doc.ref.parent.parent.id)
        });
      })
  }, []);
  
  const AddEvent = () => {
    db.collection('groups').doc(CurrentGroupId).collection('events').add({
      name: EventName,
      uid: current_user_uid,
      date: today.getTime()
    }).then(function() {
      setEventList(state => [ ...state, {name: EventName, uid: current_user_uid, date: today.getTime() }]);
      setEventModal(false);
    }).catch(function(error) {
      alert(error);
    })
  }

  const SetsetEventList = (GroupId) => {
    let list = []
    db.collection('groups').doc(GroupId).collection('events')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        const data = doc.data()
        list.push(data)})
      setEventList(list)
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    })
  }

  console.log(EventList)

  const EventFlatListDisplay = (
    EventList.length == 0 ? 
    null  
                          :
    <EventFlatList 
      data={EventList}
      extraData={EventList}
      keyExtractor={item => item.date.toString()}
      renderItem={({item}) => 
        <EventFlatListButton onPress={ () => { navigation.navigate('menu', { item: item }) }}>
          <EventFlatListText>
            {item.name}  
          </EventFlatListText>
            <Icon name="angle-right" size={20} style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', marginRight: 20, color: '#808080' }}/>
        </EventFlatListButton>
      }
    />
  );

  if (EventList.length == 0){
    return (
      <ActivityIndicator size="large" style={[styles.loading]}/>
    )
  } else {
    return (
      <Container>
        <MemberView>
          <MemberAddButton onPress={ () => setMemberModal(true) }>
            <MemberAddPlus>
              +
            </MemberAddPlus>
          </MemberAddButton>
  
          <Modal
            isVisible={MemberModal}
            >
            <MemberModalView>
              <MemberModalCloseButton onPress={ () => setMemberModal(false) }>
                <Icon name="close" size={40}/>
              </MemberModalCloseButton>
              <MemberModalTitle>
                招待コード
              </MemberModalTitle>
              <MemberAddCodeView>
                <MemberAddCodeText>
                </MemberAddCodeText>
              </MemberAddCodeView>
              <MemberModalAddText>
                友達にアプリをインストールしてもらい、{"\n"}
                この招待コードを入力してもらおう！
              </MemberModalAddText>
            </MemberModalView>
          </Modal>
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
  
            <EventPlusButton onPress={ () => setEventModal(true) }>
              <EventPlusButtonText>
                + 追加する
              </EventPlusButtonText>
            </EventPlusButton>
  
            <Modal
              isVisible={EventModal}
              >
              <EventModalView>
                <EventModalCloseButton onPress={ () => setEventModal(false) }>
                  <Icon name="close" size={40}/>
                </EventModalCloseButton>
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
              </EventModalView>
            </Modal>
          </EventPlus>
          
          <EvetnListView>
            {EventFlatListDisplay}
          </EvetnListView>
        </EventView>
      </Container>
    );
  };
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: COLORS.BASE_BACKGROUND
  }
})

const Container = styled.ScrollView`
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

const MemberModalView = styled.View`
  height: 300px;
  border-radius: 10px;
  background-color: #fff;
`

const MemberModalTitle = styled.Text`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`

const MemberModalCloseButton = styled.TouchableOpacity`
  align-self: flex-end;
`

const MemberAddCodeView = styled.View`
  margin: 20px 15px 0 15px;
  border: solid #C0C0C0;
  height: 50px;
`

const MemberAddCodeText = styled.Text`
`

const MemberModalAddText = styled.Text`
  margin-top: 30px;
  text-align: center;
  line-height: 20px;
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
  font-size: 20px;
  font-weight: bold;
`

const EventPlusButton = styled.TouchableOpacity`
`

const EventPlusButtonText = styled.Text`
`

const EventModalView = styled.View`
  height: 300px;
  border-radius: 10px;
  background-color: #fff;
`

const EventModalCloseButton = styled.TouchableOpacity`
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

const EventFlatListButton = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: #FFF;
  height: 75px;
  border-radius: 5px;
  box-shadow: 10px 10px 6px ${COLORS.CARD_SHADOW1};
  flex-direction: row;
`

const EventFlatListText = styled.Text`
  font-size: 16px;
  margin-top: auto;
  margin-bottom: auto;
  align-self: flex-start;
  margin-left: 20px;
  font-size: 15px;
  font-weight: bold;
  color: #808080;
`

export default HomeScreen;
import React, { useState, useEffect } from 'react'
import {StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase, { db } from '../../config/firebase';
import UserImage from '../../components/Image/userImage'
import MenuList from './MenuList'
import { MenuType } from '../../types/menu';
const user = firebase.auth().currentUser

const HomeScreen = ({ navigation, route }) => {
  const [EventName, setEventName] = useState('');
  // const [MemberModal, setMemberModal] = useState(false);
  const [EventModal, setEventModal] = useState(false);
  const [EventList, setEventList] = useState([]);
  const [UserList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [isRefresh, setIsRefresh] = useState(false)
  const [menuList, setMenuList] = useState<MenuType[]>([]);
  const { params } = route;
  const { currentGroupId } = params;

  const current_user = firebase.auth().currentUser;
  const current_user_uid = current_user.uid

  const today = new Date();

  useEffect(() => {
    GetEventList(currentGroupId)
    GetUserList(currentGroupId)
    setIsLoading(false)
  }, []);
  
  const AddEvent = () => {
    db.collection('groups').doc(currentGroupId).collection('events').add({
      name: EventName,
      uid: current_user_uid,
      groupId: currentGroupId,
      date: today.getTime()
    }).then(function() {
      setEventList(state => [ ...state, {name: EventName, uid: current_user_uid, date: today.getTime(), groupId: currentGroupId }]);
      setEventModal(false);
    }).catch(function(error) {
      alert(error);
    })
  }

  const GetEventList = (GroupId) => {
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

  const GetUserList = (GroupId) => {
    let list = []
    db.collection('groups').doc(GroupId).collection('groupUsers')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        const data = doc.data()
        list.push(data)})
      setUserList(list)
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    })
  }

  const GetMenuList = (GroupId) => {
    let list = []
    db.collectionGroup('menus').where('groupId', '==', GroupId).orderBy('createdAt', 'desc').limit(3)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        list.push({name: doc.data().name, uid: doc.data().uid, id: doc.id})})
      setMenuList(list)
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    })
  }

  console.log(UserList)
  
  const EventFlatListDisplay = (
    EventList.length == 0 ? 
    <NoneEventListText>
       トレーニングを追加してみよう！
    </NoneEventListText>
                          :
    <EventFlatList
      data={EventList}
      extraData={EventList}
      keyExtractor={item => item.date.toString()}
      renderItem={({item}) => 
        <EventFlatListButton onPress={ () => { navigation.navigate('menu', { item: item, currentGroupId: currentGroupId }) }}>
        <EventFlatListText>
          {item.name}  
        </EventFlatListText>
          <Icon name="angle-right" size={20} style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', marginRight: 20, color: '#808080' }}/>
        </EventFlatListButton>
      }
    />
  );

  const onRefresh = async () => {
    setIsRefresh(true)
    await GetEventList(currentGroupId) 
    await GetUserList(currentGroupId)
    await GetMenuList(currentGroupId)
    setIsRefresh(false)
  }

  return (
    isLoading? 
      <LoadingContainer>
        <ActivityIndicator size='small' style={[ styles.loading ]} />
      </LoadingContainer>
    :
    <Container
      refreshControl={
        <RefreshControl 
          refreshing={isRefresh}
          onRefresh={onRefresh}
        />
      }
    >
      <MemberView>
        <MemberListView>
          <MemberFlatList
            horizontal
            data={UserList}
            extraData={UserList}
            keyExtractor={item => item.uid.toString()}
            renderItem={({item}) => 
            <MemberFlatListView onPress={() => item.uid !== current_user_uid ? navigation.navigate('UserPage', { user: item }) : navigation.navigate('マイページ')}>
              <UserImage uri={item.imageUrl} width={50} height={50} borderRadius={50} />
              <MemberFlatListName>
                {item.name}
              </MemberFlatListName>
            </MemberFlatListView>
            }
          />
        </MemberListView>
      </MemberView>
        
      <RecentActivities>
        <RecentActivitiesListView>
          <RecentActivitiesListText>
            直近の活動
          </RecentActivitiesListText>
          <RecentActivitiesMenuListView>
            <MenuList menuList={menuList} currentGroupId={currentGroupId} GetMenuList={GetMenuList}/>
          </RecentActivitiesMenuListView>
          {/* TODO 以下は今後追加予定 */}
          {/* <RecentActivitiesListDetailButton>
            <RecentActivitiesListDetailText>
              もっと見る    <Icon name="angle-right" size={20} style={{ marginLeft: 'auto'  }}/>
            </RecentActivitiesListDetailText>
          </RecentActivitiesListDetailButton> */}
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
                <Icon name="close" size={30} color={COLORS.BASE_BLACK} />
              </EventModalCloseButton>
              <EventModalTitle>
                トレーニングを追加する
              </EventModalTitle>
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

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BASE_BACKGROUND,
    paddingTop: 10
  }
})

const LoadingContainer = styled.View`
  background-color: ${COLORS.BASE_BACKGROUND};
`

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const MemberView = styled.View`
  background-color: #FFF;
  height: 80px;
  padding: 10px 10px 0 15px;
`

const MemberListView = styled.View`
  position: relative;
`

const MemberFlatList = styled.FlatList`
`

const MemberFlatListView = styled.TouchableOpacity`
  margin-right: 10px;
  padding-bottom: 5px;
`

const MemberFlatListName = styled.Text`
  font-size: 10px;
  text-align: center;
`

const RecentActivities = styled.View`
  padding: 15px;
`

const RecentActivitiesListView = styled.View`
  margin-top: 20px;
  background-color: #FFF;
  height: 180px;
  border-radius: 5px;
  box-shadow: 10px 10px 6px ${COLORS.CARD_SHADOW1};
`

const RecentActivitiesListText = styled.Text`
  margin: 10px;
  font-size: 16px;
  font-weight: bold;
`

const RecentActivitiesMenuListView = styled.View`
  height: 120px;
`

const RecentActivitiesMenuFlatList = styled.FlatList`
`

const RecentActivitiesMenuFlatListView = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-left: 15px;
  align-items: center;
`

const RecentActivitiesMenuFlatListName = styled.Text`
  margin-left: 20px;
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
  margin: 30px 0 0 0;
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

const EventModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
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
  width: 90%;
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
  box-shadow: 10px 10px 6px ${COLORS.CARD_SHADOW1};
  padding-bottom: 10px;
`

const NoneEventListText = styled.Text`
  text-align: center;
  margin-top: 50px;
  font-size: 15px;
  font-weight: bold;
  color: #808080;
`

const EventFlatList = styled.FlatList`
`

const EventFlatListButton = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: #FFF;
  height: 75px;
  border-radius: 5px;
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
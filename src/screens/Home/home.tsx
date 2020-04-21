import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {StyleSheet, ActivityIndicator, RefreshControl, Clipboard, Alert} from 'react-native';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/AntDesign';
import firebase, { db } from '../../config/firebase';
import UserImage from '../../components/Image/userImage'
import MenuList from './MenuList'
import { MenuType } from '../../types/menu';

const HomeScreen = ({ navigation, route }) => {
  const [EventName, setEventName] = useState('');
  const [MemberModal, setMemberModal] = useState(false);
  const [EventModal, setEventModal] = useState(false);
  const [EventList, setEventList] = useState([]);
  const [UserList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [isRefresh, setIsRefresh] = useState(false)
  const [menuList, setMenuList] = useState<MenuType[]>([]);
  const [ownCode, setOwnCode] = useState<string>('')
  const { params } = route;
  const { currentGroupId } = params;
  const groupRef = db.collection('groups')
  
  const current_user = firebase.auth().currentUser;
  const current_user_uid = current_user.uid

  const today = new Date();
  
  useFocusEffect(
    useCallback(() => {
      GetEventList(currentGroupId)
      GetUserList(currentGroupId)
      setIsLoading(false)
    },[currentGroupId])
  );

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
    db.collectionGroup('menus').where('groupId', '==', GroupId).orderBy('createdAt', 'desc').limit(4)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        list.push({name: doc.data().name, uid: doc.data().uid, id: doc.id, set: doc.data().set})})
      setMenuList(list)
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    })
  }

  const EventFlatListDisplay = (
    EventList.length == 0 ? 
    <NoneEventListText>
       まずはトレーニングを追加しよう！
    </NoneEventListText>
                          :
    <EventFlatList
      data={EventList}
      extraData={EventList}
      keyExtractor={item => item.date.toString()}
      renderItem={({item}) => 
        <EventFlatListButton onPress={ () => { navigation.navigate('menu', { item: item, currentGroupId: currentGroupId }) }}>
          <EventFlatListText>
            {item.name} の記録
          </EventFlatListText>
          <Icon name="right" size={20} style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', marginRight: 20, color: '#808080' }}/>
        </EventFlatListButton>
      }
    />
  );

  // 招待をする場合のモーダル出現
  const handleInviteCodeOnClick = () => {
    try {
      groupRef.doc(currentGroupId).get().then(doc => {
        if (doc) {
          const { inviteCode } = doc.data()
          setOwnCode(inviteCode)
        }
      })
    } catch (error) {
      Alert.alert('取得に失敗しました。時間を置いてからやり直してください。')
    }
    setMemberModal(true)
  }

  const copyInviteCode = (code) => {
    Clipboard.setString(code)
    Alert.alert('コピーされました！')
  }

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
              <UserImage uri={item.imageUrl} width={50} height={50} borderRadius={60} />
              <MemberFlatListName>
                {item.name}
              </MemberFlatListName>
            </MemberFlatListView>
            }
          />
        </MemberListView>
        <MemberAddButton onPress={handleInviteCodeOnClick}>	
          <MemberAddButtonPlus>	
            +	
          </MemberAddButtonPlus>	
        </MemberAddButton>
      </MemberView>

      <Modal isVisible={MemberModal} swipeDirection='down' onSwipeComplete={() => setMemberModal(false)}>
        <InviteModalView>
          <InviteCloseBar />
          <InviteCodeWrapper onPress={() => copyInviteCode(ownCode)}>
            <InviteCodeText>{ownCode}</InviteCodeText>
          </InviteCodeWrapper>
          <InviteSubText>タップするとコピーされます</InviteSubText>
          <InviteModalTitle>この招待コードを招待したい友達に教えてあげよう！</InviteModalTitle>
          <InviteSubText>※ グループに参加できる人数は最大で5人までです</InviteSubText>
       </InviteModalView>
      </Modal>
        
      <RecentActivities>
        <RecentActivitiesListView>
          <RecentActivitiesListText>
            みんなの活動
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
                どんなトレーニングを追加しますか？
              </EventModalTitle>
              <EventAddForm 
                placeholder='例）ベンチプレス'
                autoCapitalize={'none'}
                autoCorrect={ false }
                onChangeText={ text => setEventName(text) }
              />
              <EventSubText>※ 4文字以上</EventSubText>
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
  position: relative;
  background-color: #FFF;
  height: 80px;
  padding: 10px 10px 0 15px;
`

const MemberListView = styled.View`
`

const MemberFlatList = styled.FlatList`
`

const MemberFlatListView = styled.TouchableOpacity`
  margin-right: 12px;
  padding-bottom: 5px;
`

const MemberFlatListName = styled.Text`
  padding-top: 2px;
  font-size: 10px;
  text-align: center;
  color: ${COLORS.BASE_BLACK};
`

const MemberAddButton = styled.TouchableOpacity`
  position: absolute;	
  background-color: ${COLORS.BASE_MUSCLEW};	
  right: 10px;
  top: 5px;
  width: 50px;
  height: 50px;
  margin: 5px 0 5px 0;	
  align-self: flex-end;	
  border-radius: 60px;
`

const MemberAddButtonPlus = styled.Text`
  position: absolute;	
  top: 6px;	
  left: 16px;	
  color: #FFF;	
  font-size: 30px;
`

const InviteModalView = styled.View`
  position: absolute;
  bottom: -20;
  width: 110%;
  border-radius: 10px;
  padding: 0 10px;
  height: 320px;
  background-color: ${COLORS.BASE_BACKGROUND};
  align-self: center;
`

const InviteCloseBar = styled.View`
  background-color: ${COLORS.BASE_BLACK};
  height: 5px;
  width: 100px;
  margin-top: 7px;
  border-radius: 60px;
  align-self: center;
`

const InviteCodeWrapper = styled.TouchableOpacity`
  align-items: center;
  width: 80%;
  margin: 0 auto;
  border: 1px solid ${COLORS.BASE_BORDER_COLOR};
  border-radius: 5px;
  margin-top: 30px;
`

const InviteCodeText = styled.Text`
  padding: 10px 50px;
  color: ${COLORS.BASE_BLACK};
  font-size: 30px;
  letter-spacing: 4;
  font-weight: bold;
  text-align: center;
`

const InviteSubText = styled.Text`
  width: 80%;
  margin: 0 auto;
  margin-top: 8px;
  text-align: center;
  color: ${COLORS.SUB_BLACK};
`

const InviteModalTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  font-weight: bold;
  padding-top: 50px;
  text-align: center;
`

const RecentActivities = styled.View`
  padding: 15px;
`

const RecentActivitiesListView = styled.View`
  margin-top: 20px;
  background-color: #FFF;
  height: 230px;
  border-radius: 5px;
  box-shadow: 10px 10px 6px ${COLORS.CARD_SHADOW1};
  border: 1px solid #e9e9e9;
`

const RecentActivitiesListText = styled.Text`
  margin: 15px 0px 10px 20px;
  font-size: 16px;
  font-weight: bold;
`

const RecentActivitiesMenuListView = styled.View`
  height: 150px;
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
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
`

const EventPlusButton = styled.TouchableOpacity`
`

const EventPlusButtonText = styled.Text`
  margin-right: 10px;
  color: ${COLORS.BASE_MUSCLEW};
  font-weight: bold;
  font-size: 18px;
`

const EventModalView = styled.View`
  height: 320px;
  border-radius: 10px;
  background-color: #fff;
`

const EventModalCloseButton = styled.TouchableOpacity`
  align-self: flex-end;
  padding: 10px;
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
  margin: 40px 0 10px 0;
`

const EventSubText = styled.Text`
  width: 90%;
  margin: 0 auto;
  padding-bottom: 30px;
  color: ${COLORS.SUB_BLACK};
  font-size: 12px;
`

const EventAddButton = styled.TouchableOpacity`
  width: 90%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 15px 0;
  border-radius: 60px;
  margin-top: 10px;
  opacity: ${ props => ( props.disabled ? 0.5 : 1 )};
`

const EventAddText = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 18px;
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
  border: 1px solid #e9e9e9;
  height: 75px;
  border-radius: 5px;
  flex-direction: row;
`

const EventFlatListText = styled.Text`
  font-size: 16px;
  margin-top: auto;
  margin-bottom: auto;
  align-self: flex-start;
  margin-left: 30px;
  font-size: 16px;
  font-weight: bold;
  color: ${COLORS.BASE_BLACK};
`

export default HomeScreen;
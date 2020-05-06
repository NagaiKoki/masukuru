import React, { useState, useLayoutEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {StyleSheet, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
// import icons
import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import configs
import firebase, { db } from '../../config/firebase';
import Analitycs from '../../config/amplitude'
// import components
import UserImage from '../../components/Image/userImage'
import MenuList from './MenuList'
import InviteCodeModal from '../../components/InviteModal/invite'
// import types
import { MenuType } from '../../types/menu';

// import apis
import { getMemberList } from '../../apis/Home/menber'
import { eventCategoryList } from '../../lib/eventCategory'
import { requestGroupMenuList } from '../../apis/Homes/groupMenuList'
  
const HomeScreen = ({ navigation, route }) => {
  const [MemberModal, setMemberModal] = useState(false);
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
  

  useFocusEffect(
    useCallback(() => {
      getMemberList(currentGroupId, setUserList)
      requestGroupMenuList(setMenuList, setIsLoading, currentGroupId)
      Analitycs.getUserId(current_user_uid)

      const getHeaderNav= async () => {
        let groupName;
        await db.collection('groups').doc(currentGroupId).get().then(snap => {
          if (snap.data().groupName) {
            groupName = snap.data().groupName
          } 
        })

          // グループ編集遷移
      navigation.setOptions({
        headerRight: () => (
          <EvilIcons name="gear" 
                     size={26} 
                     onPress={() => { navigation.navigate('groupInfo', { currentGroupId: currentGroupId }) }} 
                     style={{ paddingRight: 20, color: COLORS.SUB_BLACK }}
          />
        ),
        headerTitle: groupName ? groupName : 'ホーム'
      });
    }
    getHeaderNav()
    },[currentGroupId])
  );

  const EventFlatListDisplay = (
    <EventFlatList
      data={eventCategoryList()}
      extraData={eventCategoryList()}
      keyExtractor={item => item.key.toString()}
      renderItem={({item}) => 
        <EventFlatListButton onPress={ () => { navigation.navigate('menu', { item: item, currentGroupId: currentGroupId }) }}>
          <EventFlatListText>
            {item.name}
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

  const onRefresh = async () => {
    setIsRefresh(true)
    await getMemberList(currentGroupId, setUserList)
    await requestGroupMenuList(setMenuList, setIsLoading, currentGroupId)
    setIsRefresh(false)
  }
  
  return (
    isLoading? 
        <ActivityIndicator size='large' style={[ styles.loading ]} />
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

      <InviteCodeModal showInviteCodeModal={MemberModal} setShowInviteCodeModal={setMemberModal} ownCode={ownCode} />

      <RecentActivities>
        <RecentActivitiesListView>
          <RecentActivitiesListText>
            みんなの活動
          </RecentActivitiesListText>
          <RecentActivitiesMenuListView>
            <MenuList menuList={menuList} setMenuList={setMenuList} currentGroupId={currentGroupId} requestGroupMenuList={requestGroupMenuList}/>
          </RecentActivitiesMenuListView>
        </RecentActivitiesListView>
      </RecentActivities>

      <EventView>
        <EventPlus>
          <EventTitle>
            みんなの記録
          </EventTitle>

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
    // backgroundColor: COLORS.BASE_BACKGROUND,
    // paddingTop: 10
  }
})

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
  width: 85%;
`

const MemberFlatList = styled.FlatList`
`

const MemberFlatListView = styled.TouchableOpacity`
  margin-right: 12px;
  padding-bottom: 5px;
`

const MemberFlatListName = styled.Text`
  padding-top: 4px;
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

const RecentActivities = styled.View`
  padding: 15px;
`

const RecentActivitiesListView = styled.View`
  margin-top: 20px;
  background-color: #FFF;
  height: 260px;
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

const EvetnListView = styled.View`
  box-shadow: 10px 10px 6px ${COLORS.CARD_SHADOW1};
  padding-bottom: 10px;
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
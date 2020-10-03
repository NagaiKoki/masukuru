import React, { useState, useCallback, useEffect } from 'react'
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device'
import { useFocusEffect } from '@react-navigation/native';
import { RefreshControl, ScrollView, Platform } from 'react-native';
import styled from 'styled-components';
import { COLORS } from '../../../constants/Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import components
import UserImage from '../../../components/Image/userImage'
import RecordList from '../../../components/Records/recordList'
import Loading from '../../../components/Loading';
import { getHeaderNav } from './headerNav'
import ApplauseModal from '../../../components/Applause'
import EmojiModal from '../../../components/Records/Reactions/Emoji/Modal/EmojiModal'
import PostedUserEmojiModal from '../../../components/Records/Reactions/Emoji/Modal/PostedEmojiUsersModal'
// import types
import { HomeProps } from '../../../containers/Private/home'
import { UserPropertyType } from '../../../types/Analytics/amplitude'
// import apis
import { getMemberList } from '../../../apis/Home/menber'
import { isSetExpoNotificationToken, requestPutExpoNotificationToken } from '../../../apis/Push'
// import utils
import { isCloseToBottom } from '../../../utilities/scrollBottomEvent'
import { updateModule } from '../../../utilities/OtaUpdate'
import { registerForPushNotificationsAsync } from '../../../utilities/Push/registerForPushNotifications'
import { hapticFeedBack } from '../../../utilities/Haptic'
// import config
import firebase from '../../../config/firebase'
import Analytics from '../../../config/amplitude'
// selectors
import userSelectors from '../../../selectors/user'

const HomeScreen = (props: HomeProps) => {
  const { navigation, route, records, actions } = props
  const {
    requestFetchRecords,
    requestNextRecords,
    requestDestroyRecord,
    requestFetchCurrentUserData,
    toggleReflesh
  } = actions
  const { recordData, isLoading, isEmojiModalOpen, isPostedEmojiUsersModalOpen, onFreshLoading } = records
  const { currentUser } = userSelectors() // まずはuserだけselectorsにして、後で他のも置き換える
  const lastRecord = recordData[recordData.length - 1]
  const [UserList, setUserList] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false)
  const [isHomeLoading, setIsHomeLoading] = useState(false)
  const { params } = route;
  const { currentGroupId } = params;
  const currentUserId = firebase.auth().currentUser.uid

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useFocusEffect(
    useCallback(() => {
      updateModule()
      setIsHomeLoading(true)
      getMemberList(currentGroupId, setUserList)
      requestFetchRecords({ uid: null, groupId: currentGroupId})
      requestFetchCurrentUserData(currentUserId)
      getHeaderNav(currentGroupId, navigation)
      setIsHomeLoading(false)
      isSetExpoNotificationToken()
      Analytics.track('home')
    },[currentGroupId])
  );

  useEffect(() => {
    const putNotificationToken = async () => {
      // ログインユーザーのプッシュ通知トークンが登録されていない場合に、firestoreを更新する
      if (currentUser && Platform.OS === 'ios' && Device.isDevice && !currentUser.expoNotificationToken) {
        const token = await registerForPushNotificationsAsync()
        await requestPutExpoNotificationToken(token)
      }
    }
    putNotificationToken()
    if (!!currentUser) {
      const currentUserProperty: UserPropertyType = {
        name: currentUser.name,
        sex: currentUser.sex,
        age: currentUser.age,
        height: currentUser.height,
        weight: currentUser.weight
      }
      Analytics.identify(currentUserId, currentUserProperty)
    }
  }, [currentUser])

  useEffect(() => {
    toggleReflesh(false)
  }, [onFreshLoading])

  // メンバーリスト
  const renderMemberList =
    <MemberView>
      <MemberListView>
        <MemberFlatList
          horizontal
          data={UserList}
          extraData={UserList}
          keyExtractor={item => item.uid.toString()}
          renderItem={({item}) =>
          <MemberFlatListView onPress={() => navigation.navigate('UserPage', { user: item })}>
            <UserImage uri={item.imageUrl} width={50} height={50} borderRadius={60} />
            <MemberFlatListName>
              {item.name}
            </MemberFlatListName>
          </MemberFlatListView>
          }
        />
      </MemberListView>
    </MemberView>

  const onRefresh = async () => {
    hapticFeedBack('medium')
    toggleReflesh(true)
    setIsRefresh(true)
    await getMemberList(currentGroupId, setUserList)
    requestFetchRecords({ uid: null, groupId: currentGroupId})
    setIsRefresh(false)
  }

  const handleOpenRecordModal = () => {
    hapticFeedBack('medium')
    navigation.navigate('recordModal')
  }

  if (isHomeLoading) {
    return (
      <Loading size='small' />
    )
  }

  return (
    <Container refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />}>
    {renderMemberList}
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent) && recordData.length >= 5) {
            requestNextRecords({ lastRecord, uid: null, groupId: currentGroupId })
          }
        }}
        scrollEventThrottle={400}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={onRefresh}
            />
          }
        >
          { onFreshLoading ? 
            <Loading size="small" /> :
            <RecordList
              recordData={recordData}
              isLoading={isLoading}
              navigation={navigation}
              requestDestroyRecord={requestDestroyRecord}
            />
          }
      </ScrollView>
      <RecordAddBtn onPress={handleOpenRecordModal}>
        <Icon name="pencil" size={30} style={{ color: COLORS.BASE_WHITE, marginTop: 4 }} />
      </RecordAddBtn>
      <ApplauseModal />
      <EmojiModal isOpen={isEmojiModalOpen} />
      <PostedUserEmojiModal isOpen={isPostedEmojiUsersModalOpen} />
    </Container>
  );
};


const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND3};
`

const MemberView = styled.View`
  position: relative;
  background-color: ${COLORS.BASE_WHITE};
  border-color: ${COLORS.BASE_BORDER_COLOR};
  border-bottom-width: 0.5px;
  height: 82px;
  padding: 10px 0 0 10px;
`

const MemberListView = styled.View`
  width: 100%;
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

const RecordAddBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  border-radius: 60px;
  height: 60px;
  width: 60px;
  position: absolute;
  bottom: 10%;
  right: 5%;
  box-shadow: 10px 5px 5px ${COLORS.FORM_BACKGROUND};
`

export default HomeScreen;
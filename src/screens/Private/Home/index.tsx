import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device'
import { RefreshControl, ScrollView, Platform } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import constants
import { COLORS } from '../../../constants/Styles';
// import components
import MemberList from '../../../components/Home/Member/List'
import RecordList from '../../../components/Records/recordList'
import Loading from '../../../components/Loading';
import { getHeaderNav } from '../../../components/Home/HeaderNav'
import ApplauseModal from '../../../components/Applause'
import Toaster from '../../../common/Toaster'
import EmojiModal from '../../../components/Records/Reactions/Emoji/Modal/EmojiModal'
import PostedUserEmojiModal from '../../../components/Records/Reactions/Emoji/Modal/PostedEmojiUsersModal'
// import types
import { HomeProps } from '../../../containers/Private/home'
import { UserPropertyType } from '../../../types/Analytics/amplitude'
// import apis
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
import { useUiSelector } from '../../../selectors/ui'
import { useGroupSelector } from '../../../selectors/group';

const HomeScreen = (props: HomeProps) => {
  const { navigation, records, actions } = props
  const {
    requestFetchRecords,
    requestNextRecords,
    requestDestroyRecord,
    requestFetchCurrentUserData,
    toggleReflesh
  } = actions
  
  const { recordData, isLoading, isEmojiModalOpen, isPostedEmojiUsersModalOpen, onFreshLoading } = records
  const { currentUser } = userSelectors() // まずはuserだけselectorsにして、後で他のも置き換える
  const { toastMessage } = useUiSelector()
  const { currentGroupId, currentGroupUsers, isGroupLoading, requestFetchCurrentGroupUsers } = useGroupSelector()
  const lastRecord = recordData[recordData.length - 1]
  const [isRefresh, setIsRefresh] = useState(false)
  const [isHomeLoading, setIsHomeLoading] = useState(false)
  const currentUserId = firebase.auth().currentUser.uid

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    updateModule()
    setIsHomeLoading(true)
    requestFetchRecords({ uid: null, groupId: currentGroupId})
    requestFetchCurrentGroupUsers()
    requestFetchCurrentUserData(currentUserId)
    setIsHomeLoading(false)
    isSetExpoNotificationToken()
    Analytics.track('home')
  }, [currentGroupId])

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

  useFocusEffect(
    useCallback(() => {
      getHeaderNav(currentGroupId, navigation)
    }, [])
  )

  const onRefresh = async () => {
    hapticFeedBack('medium')
    toggleReflesh(true)
    setIsRefresh(true)
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
      <MemberList currentGroupUsers={currentGroupUsers} isLoading={isGroupLoading} navigation={navigation} />
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
      { toastMessage ? <Toaster toastMessage={toastMessage} /> : null }
    </Container>
  )
}


const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND3};
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
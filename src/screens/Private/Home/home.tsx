import React, { useState, useCallback } from 'react'
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from '@react-navigation/native';
import { RefreshControl, ScrollView } from 'react-native';
import styled from 'styled-components';
import { COLORS } from '../../../constants/Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import components
import UserImage from '../../../components/Image/userImage'
import RecordList from '../../../components/Records/recordList'
import Loading from '../../../components/Loading';
import { getHeaderNav } from './headerNav'
// import types
import { HomeProps } from '../../../containers/Private/home'
// import apis
import { getMemberList } from '../../../apis/Home/menber'
import { isSetExpoNotificationToken } from '../../../apis/Push'
// import utils
import { isCloseToBottom } from '../../../utilities/scrollBottomEvent'
import { updateModule } from '../../../utilities/OtaUpdate'
import { registerForPushNotificationsAsync } from '../../../utilities/Push/registerForPushNotifications'
import { sendPushNotification } from '../../../utilities/Push/sendPushNotification'
  
const HomeScreen = (props: HomeProps) => {
  const { navigation, route, records, actions } = props
  const { requestFetchRecords, requestNextRecords, requestDestroyRecord } = actions
  const { recordData, isLoading } = records
  const lastRecord = recordData[recordData.length - 1]
  const [UserList, setUserList] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false)
  const [isHomeLoading, setIsHomeLoading] = useState(false)
  const { params } = route;
  const { currentGroupId } = params;
  
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
      requestFetchRecords(null, currentGroupId)
      getHeaderNav(currentGroupId, navigation)
      setIsHomeLoading(false)
      isSetExpoNotificationToken()
    },[currentGroupId])
  );

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
    setIsRefresh(true)
    await getMemberList(currentGroupId, setUserList)
    requestFetchRecords(null, currentGroupId)
    setIsRefresh(false)
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
            requestNextRecords(lastRecord, null, currentGroupId)
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
      <RecordList 
        recordData={recordData} 
        isLoading={isLoading} 
        navigation={navigation}
        requestDestroyRecord={requestDestroyRecord}
      />
     </ScrollView>
     <RecordAddBtn onPress={() => navigation.navigate('recordModal')}>
        <Icon name="pencil" size={30} style={{ color: '#fff', marginTop: 4 }} />
      </RecordAddBtn>
    </Container>
  );
};


const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const MemberView = styled.View`
  position: relative;
  background-color: #FFF;
  border-color: ${COLORS.BASE_BORDER_COLOR};
  border-bottom-width: 0.5px;
  height: 82px;
  padding: 10px 10px 0 17px;
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
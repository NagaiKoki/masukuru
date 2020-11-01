import React, { useState, useEffect } from 'react'
import { RefreshControl, ScrollView } from 'react-native';
import styled from 'styled-components';
// import apis
import { requestFetchUser } from '../../../apis/Users'
// import config
import firebase from '../../../config/firebase';
// import constants
import { COLORS } from '../../../constants/Styles';
// import components
import Profile from '../../../components/Profile'
import RecordList from '../../../components/Records/recordList'
import Loading from '../../../components/Loading'
// import lib
import { isCloseToBottom } from '../../../utilities/scrollBottomEvent'
import { useSelectRecordActions, useUserRecords, useRecordIsLoading } from '../../../selectors/record'
import { useChartDispatchers } from '../../../selectors/chart'
// import types
import { UserType } from '../../../types/User';

const MyPageScreen = ({ navigation }) => {
  const userRecords = useUserRecords()
  const isLoading = useRecordIsLoading()
  const lastRecord = userRecords[userRecords.length - 1]
  const { requestFetchRecords, requestNextRecords, requestDestroyRecord } = useSelectRecordActions()
  const { requestFetchChartSetting, requestFetchWeights } = useChartDispatchers()
  const firebaseUser  = firebase.auth().currentUser

  const [isRefresh, setIsRefresh] = useState(false)
  const [user, setUser] = useState<UserType>(null)

  const requestFetchGetUser = async () => {
    const { user } = await requestFetchUser(firebaseUser.uid)
    setUser(user)
  }

  useEffect(() => {
    requestFetchGetUser()
    requestFetchChartSetting()
    requestFetchWeights({ date: new Date, type: 'year' })
    requestFetchRecords({ uid: firebaseUser.uid, groupId: undefined })
  }, [])

  const onRefresh = () => {
    setIsRefresh(true)
    requestFetchGetUser()
    requestFetchRecords({ uid: firebaseUser.uid, groupId: undefined })
    setIsRefresh(false)
  }

  if (!user) {
    return (
      <Loading size="small" />
    )
  }

  return (
    <MypageContainer>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent) && userRecords.length >= 5) {
            requestNextRecords({ lastRecord, uid: firebaseUser.uid, groupId: undefined })
          }
        }}
        scrollEventThrottle={200}
        refreshControl={
          <RefreshControl 
            refreshing={isRefresh}
            onRefresh={onRefresh}
          />
        }
      >
      <Profile user={user} navigation={navigation} />
      <RecordList 
        recordData={userRecords} 
        isLoading={isLoading} 
        navigation={navigation}
        requestDestroyRecord={requestDestroyRecord}
      />
      </ScrollView>
    </MypageContainer>
  );
};

const MypageContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

export default MyPageScreen;
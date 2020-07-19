import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { RefreshControl, ScrollView } from 'react-native';
import styled from 'styled-components';
import firebase from '../../../config/firebase';
import { COLORS } from '../../../constants/Styles';
// import components
import UserImage from '../../../components/Image/userImage'
import RecordList from '../../../components/Records/recordList'
import Loading from '../../../components/Loading'
// import types 
import { UserProps } from '../../../containers/Private/users/myPage'
// import lib
import { isCloseToBottom } from '../../../utilities/scrollBottomEvent'

const MyPageScreen = (props: UserProps) => {
  const { navigation, route, records, actions } = props
  const { userRecords, isLoading, beforeUserRecordSize } = records
  const lastRecord = userRecords[userRecords.length - 1]
  const { requestFetchRecords, requestNextRecords, requestDestroyRecord } = actions
  const user = firebase.auth().currentUser

  const [isRefresh, setIsRefresh] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      requestFetchRecords(user.uid, undefined)
      setIsPageLoading(false)
    }, [])
  )

  const onRefresh = () => {
    setIsRefresh(true)
    requestFetchRecords(user.uid, undefined)
    setIsRefresh(false)
  }

  if (isPageLoading) {
    return (
      <Loading size="small" />
    )
  }

  return (
    <MypageContainer>
      <MypageUserWrapper>
        <MypageUserImage>
          <UserImage user={user} width={100} height={100} borderRadius={60} />
        </MypageUserImage>
        <MyPpageUserName>{user.displayName}</MyPpageUserName>
      </MypageUserWrapper>
      <ProfileChangeBtn onPress={ () => { navigation.navigate('プロフィール編集', { user: user }) } }>
        <ProfileChangeText>プロフィールを編集する</ProfileChangeText>
      </ProfileChangeBtn>

      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent) && userRecords.length >= 5) {
            requestNextRecords(lastRecord, user.uid, undefined)
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
  padding-top: 40px;
`
// user info
const MypageUserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 10%;
`

const MypageUserImage = styled.View`
`

const MyPpageUserName = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 25px;
  padding-left: 30px;
`

const ProfileChangeBtn = styled.TouchableOpacity`
  padding: 30px;
`

const ProfileChangeText = styled.Text`
  color: ${COLORS.BASE_MUSCLEW};
  border-radius: 5px;
  text-align: center;
  padding: 7px 0;
  font-size: 16px;
  border: 1px solid ${COLORS.BASE_MUSCLEW};
  align-items: center;
  align-self: center;
  width: 80%;
`

export default MyPageScreen;
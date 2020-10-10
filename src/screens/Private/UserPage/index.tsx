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
import { UserProps } from '../../../containers/Private/users/userPage'
// import lib
import { isCloseToBottom } from '../../../utilities/scrollBottomEvent'
// import selectors
import { useUiSelector } from '../../../selectors/ui'
// import constants
import { IMAGE_URL } from '../../../constants/imageUrl'

const UserPageScreen = (props: UserProps) => {
  const { navigation, route, records, actions } = props
  const { userRecords, isLoading } = records
  const lastRecord = userRecords[userRecords.length - 1]
  const { requestFetchRecords, requestNextRecords, requestDestroyRecord } = actions
  const { toggleImageModal } = useUiSelector()
  const { user } = route.params

  const [isRefresh, setIsRefresh] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      requestFetchRecords({ uid: user.uid, groupId: undefined })
      setIsPageLoading(false)
    }, [])
  )

  const onRefresh = () => {
    setIsRefresh(true)
    requestFetchRecords({ uid: user.uid, groupId: undefined })
    setIsRefresh(false)
  }

  const handleOpenImageModal = () => {
    toggleImageModal({ isOpen: true, imageUrl: user.imageUrl || IMAGE_URL.DEFAULT_PROFILE_IMAGE })
  }
  
  if (isPageLoading) {
    return (
      <Loading size="small" />
    )
  }

  return (
    <MypageContainer>
      <MypageUserWrapper>
        <MypageUserImage onPress={handleOpenImageModal}>
          <UserImage uri={user.imageUrl} width={100} height={100} borderRadius={60} />
        </MypageUserImage>
        <MyPpageUserName>{user.name}</MyPpageUserName>
      </MypageUserWrapper>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent) && userRecords.length >= 5) {
            requestNextRecords({ lastRecord, uid: user.uid, groupId: undefined })
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

const MypageUserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 10%;
  padding-bottom: 30px;
`

const MypageUserImage = styled.TouchableOpacity`
`

const MyPpageUserName = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 25px;
  padding-left: 30px;
`

export default UserPageScreen;
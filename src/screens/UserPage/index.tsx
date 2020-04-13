import React, { useState } from 'react'
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';
import firebase, { db } from '../../config/firebase';
import { COLORS } from '../../constants/Styles';
import UserImage from '../../components/Image/userImage'
import MenuList from '../../components/MyPage/menuList';

const UserPageScreen = ({ route }) => {  
  const { user } = route.params

  return (
    <MypageContainer>
      <MypageUserWrapper>
        <MypageUserImage>
          <UserImage uri={user.imageUrl} width={100} height={100} borderRadius={5} />
        </MypageUserImage>
        <MyPpageUserName>{user.name}</MyPpageUserName>
      </MypageUserWrapper>
        <TrainingListTitle>記録一覧</TrainingListTitle>
        <MenuList user={user} />
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
const TrainingListTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 25px;
  width: 80%;
  align-self: center;
  padding-top: 40px;
`

export default UserPageScreen;
import React from 'react'
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';
import firebase, { db } from '../../config/firebase';
import { COLORS } from '../../constants/Styles';
import MenuList from '../../components/MyPage/menuList';

const MyPageScreen = ({ navigation }) => {
  const user = firebase.auth().currentUser

  const UserImage = (
    user.photoURL ?
        <Image source={{ uri: user.photoURL }}
               style={{ width: 120, height: 120, borderRadius: 5, resizeMode: 'cover', alignSelf: 'center' }}
        />
                  :
        <Image source={require('../../assets/profileDefaultImage.png')}
               style={{ width: 120, height: 100, borderRadius: 5, resizeMode: 'contain', alignSelf: 'center' }}
        />
  );

  return (
    <MypageContainer>
      <MypageUserWrapper>
        <MypageUserImage>{UserImage}</MypageUserImage>
        <MyPpageUserName>{user.displayName}</MyPpageUserName>
      </MypageUserWrapper>
        <TrainingListTitle>記録一覧</TrainingListTitle>
        <MenuList user={user} />
    </MypageContainer>
  );
};

const MypageContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
  padding-top: 100px;
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

export default MyPageScreen;
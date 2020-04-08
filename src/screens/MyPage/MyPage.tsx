import React from 'react'
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';
import firebase, { db } from '../../config/firebase';
import { COLORS } from '../../constants/Styles';
import UserImage from '../../components/Image/userImage'
import MenuList from '../../components/MyPage/menuList';

const MyPageScreen = ({ navigation }) => {
  const user = firebase.auth().currentUser
  
  return (
    <MypageContainer>
      <MypageUserWrapper>
        <MypageUserImage>
          <UserImage user={user} width={120} height={100} borderRadius={5} />
        </MypageUserImage>
        <MyPpageUserName>{user.displayName}</MyPpageUserName>
      </MypageUserWrapper>
        <ProfileChangeBtn onPress={ () => { navigation.navigate('プロフィール編集', { user: user }) } }>
          <ProfileChangeText>プロフィールを編集する</ProfileChangeText>
        </ProfileChangeBtn>
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

const ProfileChangeBtn = styled.TouchableOpacity`
  padding-top: 30px;
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

const TrainingListTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 25px;
  width: 80%;
  align-self: center;
  padding-top: 40px;
`

export default MyPageScreen;
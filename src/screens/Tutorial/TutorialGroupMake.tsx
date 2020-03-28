import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import firebase, { db } from '../../config/firebase';

const TutorialGroupMakeScreen = ({ navigation }) => {
  const currentUser = firebase.auth().currentUser;

  // １人で使う場合の処理
  const notInvitedGroupCreate = () => {    
    db.collection('groups').doc(currentUser.uid).set({
      ownerId: currentUser.uid,
      name: currentUser.displayName
    }).then(function() {
      db.collection('groups').doc(currentUser.uid).collection('groupUsers').doc(currentUser.uid).set({
        uid: currentUser.uid,
        name: currentUser.displayName,
        imageUrl: currentUser.photoURL
      })

    }).then(function() {
      navigation.replace('Home');
    }).catch(function(error) {
      console.log(error);
      alert(error);
    })
  }

  // 招待コードがある場合
  const InvitingCodeNavigate = () => {
    navigation.navigate('Invite');
  }

  return (
    <TutorialGroupContainer>
      <TutorialGroupTitle>マスクルへようこそ！</TutorialGroupTitle>
        <TutorialGroupSubTitle>マスクルを使って、みんなと一緒に理想な体型を手に入れよう！</TutorialGroupSubTitle>

      <TutorialGroupBtnWrapper>

        <TutorialInviteBtnWrapper>
          <TutorialInviteBtn onPress={ () => notInvitedGroupCreate() }>
            <TutorialInviteText>ひとまず１人で使う</TutorialInviteText>
          </TutorialInviteBtn>
          <TutorialInviteSubText>１人で使ってみて、その後に友達を招待しよう！</TutorialInviteSubText>
        </TutorialInviteBtnWrapper>

        <TutorialInvitedBtnWrapper>
          <TutorialInviteBtn onPress={ () => InvitingCodeNavigate() }>
            <TutorialInviteText>招待されたグループに参加する</TutorialInviteText>
          </TutorialInviteBtn>
          <TutorialInviteSubText>招待コードのリンクをお持ちであれば、使いましょう！</TutorialInviteSubText>
        </TutorialInvitedBtnWrapper>

      </TutorialGroupBtnWrapper>
    </TutorialGroupContainer>
  )
}

const TutorialGroupContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
  padding-top: 100px;
`

const TutorialGroupTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 25px;
  text-align: center;
`

const TutorialGroupSubTitle = styled.Text`
  margin-top: 10px;
  font-size: 18px;
  padding: 20px 30px 0 30px;
  color: ${COLORS.BASE_BLACK};
`


const TutorialGroupBtnWrapper = styled.View`
  padding-top: 20px;
`

const TutorialInviteBtnWrapper = styled.View`

`

const TutorialInviteBtn = styled.TouchableOpacity`
  width: 80%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 20px 0;
  border-radius: 5px;
  margin-top: 50px;
`

const TutorialInviteSubText = styled.Text`
  font-size: 14px;
  text-align: center;
  padding: 20px 30px 0 30px;
  color: ${COLORS.BASE_BLACK};
`

const TutorialInviteText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

const TutorialInvitedBtnWrapper = styled.View`

`

export default TutorialGroupMakeScreen;
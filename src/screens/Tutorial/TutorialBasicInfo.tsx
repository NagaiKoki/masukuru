import React, { useState } from 'react'
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../../constants/Styles';
import TutorialNavigator from '../../navigations/TutorialNavigator';
import firebase from 'firebase';

const user = firebase.auth().currentUser;

const TutorialBasicInfo = ({ navigation }) => {
  const [userName, setUserName] = useState('');

  // 名前の更新処理
  const updateUserName = () => {
    user.updateProfile({
      displayName: userName
    }).then(function() {
      navigation.navigate('')
    }).catch(function(error) {
      alert(error);
    });
  }

  const disableSubmit: boolean = (
    userName && userName.length >= 4 ? false : true
  )
  
  return (
    <TutorialContainer>
      <TutorialTitle>
        あなたの名前を登録しよう！
      </TutorialTitle>

      <TutorialNameContainer>
        <TutorialNameForm 
          placeholder='名前を入力する（4文字以上）'
          autoCapitalize={'none'}
          autoCorrect={ false }
          onChangeText={ text => setUserName(text) }
        />
      </TutorialNameContainer>

      <TutorialSubmitBtn block onPress={ () => updateUserName() } disabled={disableSubmit} disableSubmit={disableSubmit}>
        <TutorialSubmitText>次へ</TutorialSubmitText>
      </TutorialSubmitBtn>
    </TutorialContainer>
  );
};

const TutorialContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const TutorialTitle = styled.Text`
  padding-top: 130px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`

const TutorialNameContainer = styled.View`
  align-self: center;
  margin-top: 30px;
  width: 80%;
`

const TutorialNameForm = styled.TextInput`
  border: 1px solid ${COLORS.BASE_BORDER_COLOR};
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  background-color: ${COLORS.BASE_WHITE};
`

const TutorialSubmitBtn = styled.TouchableOpacity<{disableSubmit: boolean }>`
  width: 80%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 20px 0;
  border-radius: 5px;
  margin-top: 50px;
  opacity: ${ props => ( props.disableSubmit ? 0.5 : 1 ) };
`

const TutorialSubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

export default TutorialBasicInfo;
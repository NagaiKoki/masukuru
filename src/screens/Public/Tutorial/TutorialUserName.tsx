import React, { useState } from 'react'
import styled from 'styled-components';
// components
import Form from '../../../common/Form'
// import constants
import { COLORS } from '../../../constants/Styles';
// import configs
import firebase, { db } from '../../../config/firebase';

const TutorialUserNameScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  
  // 名前の更新処理
  // ユーザーがログインしているかの判定は基本'onAuthStateChanged'を使う
  const updateUserName = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        user.updateProfile({
          displayName: null
        }).then(async function() {
          const userdata = { name: userName };
          await db.collection('users').doc(user.uid).update(userdata)
        }).then(function() {
          navigation.navigate('TutorialBodyInfo', { userName: userName })
        }).catch(function(error) {
          console.log(error)
        });
      } else {
      }
    })
  }

  const disableSubmit: boolean = (
    userName && userName.length >= 3 && userName.length <= 8 ? false : true
  )
  
  return (
    <TutorialContainer>
      <TutorialStepTitle>
        - step 1 -
      </TutorialStepTitle>
      <TutorialTitle>
        あなたの名前を登録しよう！
      </TutorialTitle>

      <TutorialNameContainer>
        <Form
          placeholder='名前を入力する（3文字以上8文字以下）'
          maxLength={8}
          onChange={setUserName}
        />
      </TutorialNameContainer>

      <TutorialSubmitBtn block onPress={ () => { updateUserName() } } disabled={disableSubmit} disableSubmit={disableSubmit}>
        <TutorialSubmitText>次へ</TutorialSubmitText>
      </TutorialSubmitBtn>
    </TutorialContainer>
  );
};

const TutorialContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const TutorialStepTitle = styled.Text`
  padding: 50px 0 40px 0;
  text-align: center;
  font-size: 14px;
  color: ${COLORS.SUB_BLACK};
`

const TutorialTitle = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  color: ${COLORS.BASE_BLACK};
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
  color: ${COLORS.BASE_BLACK};
`

const TutorialSubmitBtn = styled.TouchableOpacity<{disableSubmit: boolean }>`
  width: 80%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 15px 0;
  border-radius: 60px;
  margin-top: 50px;
  opacity: ${ props => ( props.disableSubmit ? 0.5 : 1 ) };
`

const TutorialSubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

export default TutorialUserNameScreen;
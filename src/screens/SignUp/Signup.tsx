import React, { useState } from 'react'
import firebase from '../../config/firebase';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      navigation.navigate('SignupLoading');
    }).catch(error => alert(error));
  }

  return (
    <SignUpFormWrapper>
      <SignUpFormCard>

        <SignUpTitleWrapper>
          <SignUpTitleText>新規登録</SignUpTitleText>
        </SignUpTitleWrapper>
        
        <SignUpTextForm 
          placeholder='メールアドレス'
          autoCapitalize={'none'}
          autoCorrect={ false }
          onChangeText={ email => setEmail(email) }
        />
          
        <SignUpTextForm 
          placeholder='パスワード'
          autoCapitalize={'none'}
          secureTextEntry
          onChangeText={ password => setPassword(password) }
        />
         
        <SignUpSubmitButton block onPress={ () => handleSignUp() }>
          <SignUpSubmitText>登録する</SignUpSubmitText>
        </SignUpSubmitButton>
        
      </SignUpFormCard>
    </SignUpFormWrapper>
  );
};

const SignUpFormWrapper = styled.View`
  flex: 1;
  padding-top: 50px;
`

const SignUpTitleWrapper = styled.View`
  padding: 10px;
`

const SignUpTitleText = styled.Text`
  text-align: center;
  color: ${COLORS.BASE_BLACK};
  font-size: 18px;
  font-weight: bold;
`

const SignUpFormCard = styled.View`
  border-radius: 15px;
  width: 90%;
  height: auto;
  padding: 30px 0 50px 0;
  margin-top: 30px;
  align-self: center;
  background-color: ${COLORS.BASE_BACKGROUND};
  box-shadow: 0 10px 6px ${COLORS.CARD_SHADOW1};
`

const SignUpTextForm = styled.TextInput`
  background-color: ${COLORS.FORM_BACKGROUND};
  width: 90%;
  align-self: center;
  border-radius: 5px;
  padding: 20px 15px;
  margin: 10px 0;
`

const SignUpSubmitButton = styled.TouchableOpacity`
  width: 90%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 20px 0;
  border-radius: 5px;
  margin-top: 10px;
`

const SignUpSubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`



export default SignupScreen;
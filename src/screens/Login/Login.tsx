import React, { useState } from 'react'
import firebase from '../../config/firebase';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import { LoginUser } from "../../api/auth-api";
import { emailValidator, passwordValidator } from '../../validators/AuthValidator';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]=  useState("");

  const onLoginPressed = async () => {
    if (loading) return;

    const emailClinetError = emailValidator(email.value);
    const passwordClientError = passwordValidator(password.value);

    // firebaseにリクエストを送る前に、clientサイドでフォーマットをチェックする
    if (emailClinetError || passwordClientError) {
      setEmail({ ...email, error: emailClinetError });
      setPassword({ ...password, error: passwordClientError });

      return;
    }
    setLoading(true);

    const response = await LoginUser({
      email: email.value,
      password: password.value
    });

    if (response.error) {
      setError(response.error)
      setLoading(false);
    } else {
      setLoading(false);
      navigation.navigate('Home');
    }
  }

  // const handleLogin = () => {
  //   firebase.auth().signInWithEmailAndPassword(email, password)
  //   .then(() => navigation.navigate('LoginLoading')).catch(error => alert(error));
  // }

  return (
    <LoginFormWrapper>
      <LoginFormCard>

        <LoginTitleWrapper>
          <LoginTitleText>ログインする</LoginTitleText>
        </LoginTitleWrapper>
        
        <LoginTextForm 
          placeholder='メールアドレス'
          autoCapitalize={'none'}
          autoCorrect={ false }
          value={ email.value }
          onChangeText={ email => setEmail(email) }
          error={!!email.error}
          errorText={email.error}
        />
          
        <LoginTextForm 
          placeholder='パスワード'
          autoCapitalize={'none'}
          secureTextEntry
          value={ password.value }
          onChangeText={ password => setPassword(password) }
        />
         
        <LoginSubmitButton block onPress={ () => onLoginPressed() }>
          <LoginSubmitText>ログインする</LoginSubmitText>
        </LoginSubmitButton>
        
      </LoginFormCard>
    </LoginFormWrapper>
  );
};

const LoginFormWrapper = styled.View`
  flex: 1;
  padding-top: 50px;
`

const LoginTitleWrapper = styled.View`
  padding: 10px;
`

const LoginTitleText = styled.Text`
  text-align: center;
  color: ${COLORS.BASE_BLACK};
  font-size: 18px;
  font-weight: bold;
`

const LoginFormCard = styled.View`
  border-radius: 15px;
  width: 90%;
  height: auto;
  padding: 30px 0 50px 0;
  margin-top: 30px;
  align-self: center;
  background-color: ${COLORS.BASE_BACKGROUND};
  box-shadow: 0 10px 6px ${COLORS.CARD_SHADOW1};
`

const LoginTextForm = styled.TextInput`
  background-color: ${COLORS.FORM_BACKGROUND};
  width: 90%;
  align-self: center;
  border-radius: 5px;
  padding: 20px 15px;
  margin: 10px 0;
`

const LoginSubmitButton = styled.TouchableOpacity`
  width: 90%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 20px 0;
  border-radius: 5px;
  margin-top: 10px;
`

const LoginSubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`



export default LoginScreen;
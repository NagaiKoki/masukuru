import React, { useState, useEffect } from 'react'
import firebase from '../../config/firebase';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import { LoginUser } from "../../api/auth-api";
import { emailValidator, passwordValidator } from '../../validators/AuthValidator';
import Toast from '../../components/Toaster';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] =  useState("");
  
  // ログインボタンのクリック
  const onLoginPressed = async () => {
    if (loading) return;

    const emailClinetError = emailValidator(email.value);
    const passwordClientError = passwordValidator(password.value);

    // firebaseにリクエストを送る前に、clientサイドでフォーマットをチェックする
    if (emailClinetError) {
      return setError(emailClinetError)
    } else if (passwordClientError) {
      return setError(passwordClientError)
    };

    setLoading(true);

    // firebaseへのリクエスト
    const response = await LoginUser({
      email: email.value,
      password: password.value
    });

    if (response.error) {
      setError(response.error)
      setLoading(false);
    } else {
      setLoading(false);
      navigation.navigate('LoginLoading');
    }
  };

  // エラー文の削除
  const handleErrorClear = () => {
    setError('');
  };

  // 文字が入力されるまでsubmit不可
  const disableSubmit: boolean = (
    email.value.length && password.value.length ? false : true
  );

  return (
    <LoginFormWrapper>
      <LoginFormCard>

      <Toast 
        message={error} 
        onDismiss={handleErrorClear} 
      />

        <LoginTitleWrapper>
          <LoginTitleText>ログインする</LoginTitleText>
        </LoginTitleWrapper>
        
        <LoginTextForm 
          placeholder='メールアドレス'
          autoCapitalize={'none'}
          autoCorrect={ false }
          value={ email.value }
          onChangeText={ (text: string) => setEmail({ value: text, error: '' }) }
        />
        
        <LoginTextForm 
          placeholder='パスワード'
          autoCapitalize={'none'}
          secureTextEntry
          value={ password.value }
          onChangeText={ (text: string) => setPassword({ value: text, error: "" }) }
        />
         
        <LoginSubmitButton block onPress={ () => onLoginPressed() } disabled={ disableSubmit } disableSubmit={ disableSubmit }>
          <LoginSubmitText>ログインする</LoginSubmitText>
        </LoginSubmitButton>
        
      </LoginFormCard>

    </LoginFormWrapper>
  );
};

const LoginFormWrapper = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
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
  background-color: ${COLORS.BASE_WHITE};
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

const LoginSubmitButton = styled.TouchableOpacity<{disabled: boolean}>`
  width: 90%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 20px 0;
  border-radius: 5px;
  margin-top: 10px;
  opacity: ${ props => ( props.disabled ? 0.5 : 1 )};
`

const LoginSubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

export default LoginScreen;
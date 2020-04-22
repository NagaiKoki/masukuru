import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import { LoginUser } from "../../apis/auth-api";
import { emailValidator, passwordValidator } from '../../validators/AuthValidator';
import { GoogleLogin } from '../../apis/auth-api'
import Toast from '../../components/Toaster';

const LoginScreen = ({ route }) => {
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

        <GoogleSignInWrapper onPress={ () => GoogleLogin(route) }>
          <GoogleSignInTextWrapper>
            <GoogleSignInText>Google アカウントでログインする</GoogleSignInText>
          </GoogleSignInTextWrapper>
        </GoogleSignInWrapper>


        <FormEmailLoginWrapper>
          <FormLable>メールアドレス</FormLable>
          <LoginTextForm 
            placeholder='メールアドレスを入力する'
            autoCapitalize={'none'}
            autoCorrect={ false }
            value={ email.value }
            onChangeText={ (text: string) => setEmail({ value: text, error: '' }) }
          />
          
          <FormLable>パスワード</FormLable>
          <LoginTextForm 
            placeholder='パスワードを入力する'
            autoCapitalize={'none'}
            secureTextEntry
            value={ password.value }
            onChangeText={ (text: string) => setPassword({ value: text, error: "" }) }
          />
          
          <LoginSubmitButton block onPress={ () => onLoginPressed() } disabled={ disableSubmit } disableSubmit={ disableSubmit }>
            <LoginSubmitText>ログインする</LoginSubmitText>
          </LoginSubmitButton>
        </FormEmailLoginWrapper>
        
      </LoginFormCard>

    </LoginFormWrapper>
  );
};

const LoginFormWrapper = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const LoginFormCard = styled.View`
  border-radius: 15px;
  width: 90%;
  height: auto;
  padding: 30px 0 50px 0;
  align-self: center;
  background-color: ${COLORS.BASE_WHITE};
`

const GoogleSignInWrapper = styled.TouchableOpacity`
  background-color: #dd4b39;
  width: 90%;
  align-self: center;
  padding: 15px 0;
  margin: 20px 0;
  margin-bottom: 40px;
  border-radius: 60px;
`

const GoogleSignInTextWrapper = styled.Text`
  padding: 0 20px;
  flex-direction: row;
  text-align: center;
  justify-content: space-around;
  color: ${COLORS.BASE_WHITE};
`

const GoogleSignInText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
`

const FormEmailLoginWrapper = styled.View`
  align-self: center;
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 1;
  padding-top: 30px;
  width: 90%;
`

const FormLable = styled.Text`
  color: ${COLORS.BASE_BLACK};
  width: 100%;
  margin: 5px auto;
  margin-top: 10px;
  font-weight: bold;
`

const LoginTextForm = styled.TextInput`
  background-color: ${COLORS.FORM_BACKGROUND};
  width: 100%;
  align-self: center;
  border-radius: 5px;
  padding: 15px 15px;
  margin: 10px 0;
`

const LoginSubmitButton = styled.TouchableOpacity<{disabled: boolean}>`
  width: 100%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 15px 0;
  border-radius: 60px;
  margin-top: 40px;
  opacity: ${ props => ( props.disabled ? 0.5 : 1 )};
`

const LoginSubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

export default LoginScreen;
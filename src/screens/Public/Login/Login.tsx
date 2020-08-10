import React, { useState } from 'react'
import styled from 'styled-components';
// import components
import Form from '../../../common/Form'
import Toast from '../../../components/Toaster';
// import constants
import { COLORS } from '../../../constants/Styles';
// import apis
import { LoginUser } from "../../../apis/auth";
// import validators
import { emailValidator, passwordValidator } from '../../../validators/AuthValidator';

const LoginScreen = ({ route, navigation }) => {
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
        <FormEmailLoginWrapper>
        <Toast 
          message={error} 
          onDismiss={handleErrorClear} 
        />
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

          <PasswordResetBtn block onPress={ () => navigation.navigate('ResetPassword') }>
            <PasswordResetText>パスワードをお忘れですか？</PasswordResetText>
          </PasswordResetBtn>
          
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
  margin-top: 20px;
  padding: 30px 0 50px 0;
  align-self: center;
  background-color: ${COLORS.BASE_WHITE};
`

const FormEmailLoginWrapper = styled.View`
  align-self: center;
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
  height: 50px;
  align-self: center;
  border-radius: 5px;
  padding: 15px 15px;
  margin: 10px 0;
  font-size: 17px;
  color: ${COLORS.BASE_BLACK};
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

const PasswordResetBtn = styled.TouchableOpacity``

const PasswordResetText = styled.Text`
  text-decoration: underline;
  text-align: center;
  padding-top: 10px;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
`

export default LoginScreen;
import React, { useState } from 'react'
import { RegisterUser } from '../../api/auth-api';
import { emailValidator, passwordValidator } from '../../validators/AuthValidator';
import Toast from '../../components/Toaster';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import firebase from 'firebase';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onSignUpPrss = async () => {
    if (isLoading) return;

    const emailClinetError = emailValidator(email.value);
    const passwordClientError = passwordValidator(password.value);

    // firebaseにリクエストを送る前に、clientサイドでフォーマットをチェックする
    if (emailClinetError) {
      return setError(emailClinetError)
    } else if (passwordClientError) {
      return setError(passwordClientError)
    };

    setIsLoading(true)

    // firebaseへのリクエスト
    const response = await RegisterUser({
      email: email.value,
      password: password.value
    });

    if (response.error) {
      setError(response.error)
    } else {   
      navigation.navigate('SignupLoading');
    }

    return () => {
      setIsLoading(false);
    }
  }

  // エラー文の削除
  const handleErrorClear = () => {
    setError('');
  };

  // 文字が入力されるまでsubmit不可
  const disableSubmit: boolean = (
    email.value.length && password.value.length ? false : true
  );

  return (
    <SignUpFormWrapper>
      <SignUpFormCard>

        <SignUpTitleWrapper>
          <SignUpTitleText>新規登録</SignUpTitleText>
        </SignUpTitleWrapper>

        <Toast 
          message={error} 
          onDismiss={handleErrorClear} 
        />
        
        <SignUpTextForm 
          placeholder='メールアドレス'
          autoCapitalize={'none'}
          autoCorrect={ false }
          onChangeText={ text => setEmail({ value: text, error: '' }) }
        />
          
        <SignUpTextForm 
          placeholder='パスワード'
          autoCapitalize={'none'}
          secureTextEntry
          onChangeText={ text => setPassword({ value: text, error: '' }) }
        />
         
        <SignUpSubmitButton block onPress={ () => onSignUpPrss() } disabled={disableSubmit} disableSubmit={disableSubmit}>
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

const SignUpSubmitButton = styled.TouchableOpacity<{disableSubmit: boolean}>`
  width: 90%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 20px 0;
  border-radius: 5px;
  margin-top: 10px;
  opacity: ${ props => ( props.disableSubmit ? 0.5 : 1 ) };
`

const SignUpSubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`
export default SignupScreen;
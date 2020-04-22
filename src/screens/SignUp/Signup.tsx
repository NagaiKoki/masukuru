import React, { useState } from 'react'
import { RegisterUser } from '../../apis/auth-api';
import { emailValidator, passwordValidator } from '../../validators/AuthValidator';
import Toast from '../../components/Toaster';
import styled from 'styled-components';
import { GoogleLogin } from '../../apis/auth-api';
import { Linking } from 'expo';
import { COLORS } from '../../constants/Styles';

const SignupScreen = ({ route }) => {
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
      setIsLoading(false);
    } else {   
      setIsLoading(false);
    }
  }

  // エラー文の削除
  const handleErrorClear = () => {
    setError('');
  };

  const handleLink = () => {
    Linking.openURL('https://nagaikoki.github.io/masukuru_privacy/')
  }

  // 文字が入力されるまでsubmit不可
  const disableSubmit: boolean = (
    email.value.length && (password.value.length && password.value.length > 6) ? false : true
  );

  return (
    <SignUpFormWrapper>
      <SignUpFormCard>

        <Toast 
          message={error} 
          onDismiss={handleErrorClear} 
        />

        <GoogleSignInWrapper onPress={ () => GoogleLogin(route) }>
          <GoogleSignInTextWrapper>
            <GoogleSignInText>Google アカウントで登録する</GoogleSignInText>
          </GoogleSignInTextWrapper>
        </GoogleSignInWrapper>

        <FormEmailSignInWrapper>
          <FormLable>メールアドレス</FormLable>
          <SignUpTextForm 
            placeholder='メールアドレスを入力する'
            autoCapitalize={'none'}
            autoCorrect={ false }
            onChangeText={ text => setEmail({ value: text, error: '' }) }
          />
          
          <FormLable>パスワード</FormLable>
          <SignUpTextForm 
            placeholder='パスワードを入力する'
            autoCapitalize={'none'}
            secureTextEntry
            onChangeText={ text => setPassword({ value: text, error: '' }) }
          />
          <FormSubText>※ 6文字以上</FormSubText>

          <PrivacyWrapper>
            <PrivacyPolicySub>利用を開始することで、</PrivacyPolicySub>
            <PrivacyPolicyLink onPress={handleLink}>プライバシーポリシー</PrivacyPolicyLink>
            <PrivacyPolicySub>に同意することとします。</PrivacyPolicySub>
          </PrivacyWrapper>
          
          <SignUpSubmitButton block onPress={ () => onSignUpPrss() } disabled={disableSubmit} disableSubmit={disableSubmit}>
            <SignUpSubmitText>登録する</SignUpSubmitText>
          </SignUpSubmitButton>
        </FormEmailSignInWrapper>
        
      </SignUpFormCard>
    </SignUpFormWrapper>
  );
};

const SignUpFormWrapper = styled.ScrollView`
  flex: 1;
  padding-top: 10px;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const SignUpFormCard = styled.View`
  border-radius: 15px;
  width: 90%;
  height: auto;
  padding: 20px 0 50px 0;
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

const FormEmailSignInWrapper = styled.View`
  padding-top: 30px;
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 0.8;
  width: 90%;
  align-self: center;
`

const FormLable = styled.Text`
  color: ${COLORS.BASE_BLACK};
  width: 100%;
  margin: 5px auto;
  margin-top: 10px;
  font-weight: bold;
`

const FormSubText = styled.Text`
  color: ${COLORS.SUB_BLACK};
  width: 100%;
  margin: 5px auto;
`

const SignUpTextForm = styled.TextInput`
  background-color: ${COLORS.FORM_BACKGROUND};
  width: 100%;
  align-self: center;
  border-radius: 5px;
  padding: 15px 15px;
  margin: 10px 0;
`
const PrivacyWrapper = styled.Text`
  color: ${COLORS.BASE_BLACK};
  padding-top: 20px;
`

const PrivacyPolicySub = styled.Text`
  color: ${COLORS.BASE_BLACK};
`

const PrivacyPolicyLink = styled.Text`
  text-decoration: underline;
  color: ${COLORS.BASE_BLACK};
`

const SignUpSubmitButton = styled.TouchableOpacity<{disableSubmit: boolean}>`
  width: 100%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 15px 0;
  border-radius: 60px;
  margin-top: 30px;
  opacity: ${ props => ( props.disableSubmit ? 0.5 : 1 ) };
`

const SignUpSubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`
export default SignupScreen;
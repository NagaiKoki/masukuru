import React, { useState } from 'react';
import styled from 'styled-components';
import { Alert } from 'react-native'
import firebase from '../../config/firebase'
import { emailValidator } from '../../validators/AuthValidator';
import { COLORS } from '../../constants/Styles'
import Toast from '../../components/Toaster';

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('');

  // エラー文の削除
  const handleErrorClear = () => {
    setError('');
  };
  
  const requestResetPassword = () => {
    const emailClinetError = emailValidator(email)
    if (emailClinetError) {
      return setError(emailClinetError)
    }
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      Alert.alert('パスワード再設定用のメールを送信しました。お試しください。');
      navigation.navigate('SignupHome');
    }).catch((error) => {
      Alert.alert('入力いただいたメールアドレスは存在しません。入力したメールアドレスをもう一度お確かめください。')
    })
  }

  return (
    <Container>
      <PasswordResetTitle>
        パスワード再設定用のメールを送信する
      </PasswordResetTitle>
        <Toast 
          message={error} 
          onDismiss={handleErrorClear} 
        />

        <ResetForm 
          placeholder='メールアドレスを入力する'
          autoCapitalize={'none'}
          autoCorrect={ false }
          onChangeText={ text => setEmail(text) }
        />
      <TutorialSubmitBtn block onPress={ () => { requestResetPassword() } }>
        <TutorialSubmitText>送信する</TutorialSubmitText>
      </TutorialSubmitBtn>
    </Container>
  )
}

const Container = styled.View`
  display: flex;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const ResetForm = styled.TextInput`
  width: 90%;
  align-self: center;
  padding: 15px;
  margin-top: 30px;
  border-radius: 5px;
  background-color: ${COLORS.FORM_BACKGROUND};
  color: ${COLORS.BASE_BLACK};
`

const TutorialSubmitBtn = styled.TouchableOpacity<{disableSubmit: boolean }>`
  width: 90%;
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

const PasswordResetTitle = styled.Text` 
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
`

export default ResetPasswordScreen;
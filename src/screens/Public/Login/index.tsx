import React, { useState } from 'react'
import styled from 'styled-components'
// import components
import EmailAuthForm from '../../../components/Auth/EmailAuthForm'
import Toaster from '../../../components/Toaster'
// import selectors
import { useAuthSelectors } from '../../../selectors/auth'
// import constants
import { COLORS } from '../../../constants/Styles'

const LoginScreen = ({ navigation }) => {
  const { error, requestFetchEmailSignIn, clearError } = useAuthSelectors()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (value: string) => {
    setEmail(value)
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }

  const handleErrorClear = () => {
    clearError()
  }

  const handleSubmit = () => {
    requestFetchEmailSignIn({ email, password, isLogin: true })
  }

  return (
    <Container>
      <Wrapper>
        <Toaster message={error} onDismiss={handleErrorClear} />
        <EmailAuthForm 
          email={email}
          password={password}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
        />
        <PasswordResetBtn block onPress={ () => navigation.navigate('ResetPassword') }>
          <PasswordResetText>パスワードをお忘れですか？</PasswordResetText>
        </PasswordResetBtn>
        <SubmitBtn onPress={handleSubmit} disabled={!email || !password}>
          <SubmitText>ログインする</SubmitText>
        </SubmitBtn>
      </Wrapper>
    </Container>
  )
}

export default LoginScreen

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const Wrapper = styled.View`
  align-self: center;
  border-radius: 15px;
  width: 95%;
  height: auto;
  margin-top: 40px;
  padding: 20px 15px 50px 15px;
  background-color: ${COLORS.BASE_WHITE};
`

const FormWrapper = styled.View``

const FormLabel = styled.Text`
  color: ${COLORS.BASE_BLACK};
  width: 100%;
  margin: 5px auto;
  margin-top: 10px;
  font-weight: bold;
`

const PasswordResetBtn = styled.TouchableOpacity``

const PasswordResetText = styled.Text`
  text-decoration: underline;
  text-align: center;
  padding-top: 10px;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
`

const SubmitBtn = styled.TouchableOpacity<{ disabled: boolean }>`
  width: 100%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 15px 0;
  border-radius: 60px;
  margin-top: 40px;
  opacity: ${ props => ( props.disabled ? 0.5 : 1 )};
`

const SubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`
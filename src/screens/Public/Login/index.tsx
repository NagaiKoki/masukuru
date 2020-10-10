import React, { useState } from 'react'
import styled from 'styled-components'
// import components
import EmailAuthForm from '../../../components/Auth/EmailAuthForm'
import Toaster from '../../../components/Toaster'
import Button from '../../../common/Button'
// import selectors
import { useAuthSelectors } from '../../../selectors/auth'
// import constants
import { COLORS } from '../../../constants/Styles'

const LoginScreen = ({ navigation }) => {
  const { error, isLoading, requestFetchEmailSignIn, clearError } = useAuthSelectors()
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
    requestFetchEmailSignIn({ email, password, method: 'signin' })
  }

  return (
    <Container>
      <Wrapper>
        <Toaster message={error} onDismiss={handleErrorClear} />
        <EmailAuthForm 
          email={email}
          password={password}
          type="login"
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
        />
        <PasswordResetBtn block onPress={ () => navigation.navigate('ResetPassword') }>
          <PasswordResetText>パスワードをお忘れですか？</PasswordResetText>
        </PasswordResetBtn>
        
        <SubmitBtn>
          <Button 
            text={isLoading ? 'ログイン中...' : 'ログインする'}
            bold={true}
            padding="15px 0"
            fontSize={16}
            disabled={!email || !password || isLoading}
            handleOnClick={handleSubmit} 
          />
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

const PasswordResetBtn = styled.TouchableOpacity``

const PasswordResetText = styled.Text`
  text-decoration: underline;
  text-align: center;
  padding-top: 10px;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
`

const SubmitBtn = styled.TouchableOpacity<{ disabled: boolean }>`
  margin-top: 40px;
`
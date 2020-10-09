import React, { useState } from 'react'
import { Linking } from 'expo';
import Constants from 'expo-constants'
import styled from 'styled-components'
// import components
import EmailAuthForm from '../../../components/Auth/EmailAuthForm'
import Button from '../../../common/Button'
import Toaster from '../../../components/Toaster'
// import selectors
import { useAuthSelectors } from '../../../selectors/auth'
// import constants
import { COLORS } from '../../../constants/Styles'

const SignupScreen = () => {
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
    requestFetchEmailSignIn({ email, password, method: 'signup' })
  }

  const handleLink = () => {
    Linking.openURL(Constants.manifest.extra.policyUrl)
  }

  const disabled = !email || !password || password.length < 6

  const renderPrivacy =
    <PrivacyWrapper>
      <PrivacyPolicySub>利用を開始することで、</PrivacyPolicySub>
      <PrivacyPolicyLink onPress={handleLink}>プライバシーポリシー</PrivacyPolicyLink>
      <PrivacyPolicySub>に同意することとします。</PrivacyPolicySub>
    </PrivacyWrapper>
    
  return (
    <Container>
      <Wrapper>
        <Toaster message={error} onDismiss={handleErrorClear} />
        <EmailAuthForm 
          email={email}
          password={password}
          type="signup"
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
        />
        {renderPrivacy}
        <SubmitBtn>
          <Button 
            text="登録する"
            bold={true}
            padding="15px 0"
            fontSize={16}
            disabled={disabled}
            handleOnClick={handleSubmit} 
          />
        </SubmitBtn>
      </Wrapper>
    </Container>
  )
}

export default SignupScreen

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

const PrivacyWrapper = styled.Text`
  color: ${COLORS.BASE_BLACK};
  padding-top: 20px;
`

const PrivacyPolicySub = styled.Text`
  color: ${COLORS.SUB_BLACK};
`

const PrivacyPolicyLink = styled.Text`
  text-decoration: underline;
  color: ${COLORS.SUB_BLACK};
`

const SubmitBtn = styled.View`
  margin-top: 30px;
`
import React, { Dispatch, SetStateAction } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';
import Modal from 'react-native-modal';
import { COLORS } from '../../../constants/Styles';
// import types
import { ThirdPartyAuth, AuthMethodType } from '../../../types/auth'
// import selectors
import { useAuthSelectors } from '../../../selectors/auth'

interface SignUpModalProps {
  isSignUp: boolean
  route: any
  navigation: any
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

const SignUpModal = (props: SignUpModalProps) => {
  const { isSignUp, route, navigation, isVisible, setIsVisible } = props
  const { requestThirdPartyAuth } = useAuthSelectors()

  const displayText = isSignUp ? '登録' : 'ログイン';
  const NavigationDirection = isSignUp ? 'Signup' : 'Login'

  const handleNavigation = () => {
    setIsVisible(false)
    navigation.navigate(NavigationDirection)
  }

  const handleRequestAuth = (type: ThirdPartyAuth) => {
    const method: AuthMethodType = isSignUp ? 'signup' : 'signin'
    requestThirdPartyAuth({ method: method, type })
  }

  return (
    <Modal isVisible={isVisible} swipeDirection='down' onSwipeComplete={() => setIsVisible(false)}>
      <Container>
        <CloseBar />
        <SignUpAppleBtn block onPress={() => handleRequestAuth('apple')}>
          <ButtonWrapper>
            <Icon name='apple1' size={20} style={{ color: '#fff' }}/>
            {
              isSignUp ? <SignUpText>Sign up with Apple</SignUpText> : <SignUpText>Sign in with Apple</SignUpText>
            }
          </ButtonWrapper>
        </SignUpAppleBtn>

        <SignUpGoogleBtn block onPress={() => handleRequestAuth('google')}>
          <ButtonWrapper>
            <Icon name='google' size={20} style={{ color: '#fff' }}/>
            <SignUpText>Googleで{displayText}する</SignUpText>
          </ButtonWrapper>
        </SignUpGoogleBtn>

        <SignUpEmailBtn block onPress={() => handleNavigation()}>
          <ButtonWrapper>
            <Icon name='mail' size={20} style={{ color: '#fff' }}/>
            <SignUpText>メールアドレスで{displayText}する</SignUpText>
          </ButtonWrapper>
        </SignUpEmailBtn>
      </Container>
    </Modal>
  )
}

const Container = styled.View`
  position: absolute;
  bottom: -20px;
  width: 110%;
  align-self: center;
  border-radius: 10px;
  padding: 5px 10px 0;
  height: 330px;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const CloseBar = styled.View`
  background-color: ${COLORS.BASE_BLACK};
  height: 5px;
  width: 100px;
  margin-top: 7px;
  margin-bottom: 20px;
  border-radius: 60px;
  align-self: center;
`

const SignUpAppleBtn = styled.TouchableOpacity`
  align-self: center;
  margin-top: 20px;
  width: 90%;
  height: 44px;
  border-radius: 5px;
  background-color: #000;
`

const ButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  height: 44px;
  width: 90%;
  align-self: center;
`

const SignUpGoogleBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 90%;
  align-self: center;
  height: 44px;
  border-radius: 5px;
  background-color: #dd4b39;
`

const SignUpEmailBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 90%;
  align-self: center;
  height: 44px;
  border-radius: 5px;
  background-color: ${COLORS.BASE_MUSCLEW};
`

const SignUpText = styled.Text`
  align-self: center;
  margin-left: 20px;
  font-size: 17px;
  font-weight: bold;
  color: ${COLORS.BASE_WHITE};
`

export default SignUpModal;
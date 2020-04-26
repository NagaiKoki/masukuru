import React, { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import Modal from 'react-native-modal';
import { COLORS } from '../../constants/Styles';
import { AppleLogin, GoogleLogin } from '../../apis/auth'
import Icon from 'react-native-vector-icons/AntDesign';

interface SignUpModalProps {
  isSignUp: boolean
  route: any
  navigation: any
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

const SignUpModal = (props: SignUpModalProps) => {
  const { isSignUp, route, navigation, isVisible, setIsVisible } = props

  const displayText = isSignUp ? '登録' : 'ログイン';
  const NavigationDirection = isSignUp ? 'Signup' : 'Login'

  const handleNavigation = () => {
    setIsVisible(false)
    navigation.navigate(NavigationDirection)
  }

  return (
    <Modal isVisible={isVisible} swipeDirection='down' onSwipeComplete={() => setIsVisible(false)}>
      <Container>
        <CloseBar />
        <SignUpAppleBtn block onPress={() => AppleLogin(route)}>
          <Icon name='apple1' size={20} style={{ color: '#fff' }}/>
            <SignUpText>Appleで{displayText}する</SignUpText>
        </SignUpAppleBtn>

        <SignUpGoogleBtn block onPress={() => GoogleLogin(route)}>
          <Icon name='google' size={20} style={{ color: '#fff' }}/>
          <SignUpText>Googleで{displayText}する</SignUpText>
        </SignUpGoogleBtn>

        <SignUpEmailBtn block onPress={() => handleNavigation()}>
          <Icon name='mail' size={20} style={{ color: '#fff' }}/>
          <SignUpText>メールアドレスで{displayText}する</SignUpText>
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 90%;
  align-self: center;
  padding: 15px 0;
  border-radius: 5px;
  background-color: #000;
`

const SignUpGoogleBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 90%;
  align-self: center;
  padding: 15px 0;
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
  padding: 15px 0;
  border-radius: 5px;
  background-color: ${COLORS.BASE_MUSCLEW};
`

const SignUpText = styled.Text`
  align-self: center;
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
  color: ${COLORS.BASE_WHITE};
`

export default SignUpModal;
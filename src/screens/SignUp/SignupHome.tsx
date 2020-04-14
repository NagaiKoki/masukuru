import React from 'react'
import { Image, Text, NativeModules } from 'react-native';
const { RNTwitterSignIn } = NativeModules;
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import firebase from '../../config/firebase';

const TwitterTest = styled.TouchableOpacity`
`

const SignupHomeScreen = ({ navigation }) => {

  const TwitterLogin = () => {
    
  }

  return (
    <Container>
      <ImageWrapper>
        <ImageLogoWrapper>
          <Image 
            source={require('../../assets/main_icon.png')}
            style={{ width: 80, height: 80, borderRadius: 60, resizeMode: 'contain', alignSelf: 'center' }}
          />
        </ImageLogoWrapper>
        <ImageTitleWrapper>
          <Image 
            source={require('../../assets/masukuru_title.png')}
            style={{ width: 120, height: 120, borderRadius: 60, resizeMode: 'contain', alignSelf: 'center' }}
          />
        </ImageTitleWrapper>

      </ImageWrapper>


      <TwitterTest>
        <Text>twitter</Text>
      </TwitterTest>

      <SignUpCard>
        <SignUpButtonWrapper>
          <SignUpButton onPress={ () => navigation.navigate('Signup') }>
            <SignUpText>無料登録する</SignUpText>
          </SignUpButton>
        </SignUpButtonWrapper>

        <LoginSupportWrapper>
          <LoginSupprtText>もしアカウントをお持ちの場合は</LoginSupprtText>
        </LoginSupportWrapper>

        <LoginButtonWrapper>
          <LoginButton onPress={ () => navigation.navigate('Login') }>
            <LoginText>ログインする</LoginText>
          </LoginButton>
        </LoginButtonWrapper>
      </SignUpCard>    
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
  padding-top: 100px;
`

const ImageWrapper = styled.View`
  flex-direction: row;
  align-self: center;
  align-items: center;
`

const ImageLogoWrapper = styled.View`
`

const ImageTitleWrapper = styled.View`
  margin: 10px 20px 0 10px;
`
 
const SignUpCard = styled.View`
  border-radius: 15px;
  width: 85%;
  padding: 50px 0;
  margin-top: 30px;
  align-self: center;
`

const SignUpButtonWrapper = styled.View`
  display: flex;
  justify-content: center;
`

const SignUpButton = styled.TouchableOpacity`
  background-color: ${COLORS.BASE_MUSCLEW};
  border-radius: 60px;
  padding: 20px 0;
  width: 95%;
  align-self: center;
`

const SignUpText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

const LoginSupportWrapper = styled.View`
  padding: 20px 0 15px 0;  
`

const LoginSupprtText = styled.Text`
  text-align: center;
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
`

const LoginButtonWrapper = styled.View`
`

const LoginButton = styled.TouchableOpacity`
  border: 2px solid ${COLORS.BASE_MUSCLEW};
  border-radius: 60px;
  padding: 20px 0;
  width: 95%;
  align-self: center;
`

const LoginText = styled.Text`
  color: ${COLORS.BASE_MUSCLEW};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

export default SignupHomeScreen;
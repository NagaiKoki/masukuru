import React from 'react'
import { Image } from 'react-native';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';

const SignupHomeScreen = ({ navigation }) => {
  
  
  return (
    <Container>
      <ImageWrapper>
        <Image 
          source={require('../../assets/main_icon.png')}
          style={{ width: '70%', height: 100, resizeMode: 'contain', alignSelf: 'center' }}
        />
      </ImageWrapper>

      <SignUpTitle>
        Musclew
      </SignUpTitle>

      <SignUpCard>
        <SignUpButtonWrapper>
          <SignUpButton onPress={ () => navigation.navigate('Signup') }>
            <SignUpText>新規登録する</SignUpText>
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
  padding-top: 60px;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const ImageWrapper = styled.View`
  justify-content: center;
  padding-bottom: 20px;
`

const SignUpTitle = styled.Text`
  text-align: center;
  color: ${COLORS.BASE_MUSCLEW};
  font-size: 30px;
  font-weight: bold;
`
 
const SignUpCard = styled.View`
  border-radius: 15px;
  width: 85%;
  padding: 70px 0;
  margin-top: 30px;
  align-self: center;
  background-color: ${COLORS.BASE_BACKGROUND};
  box-shadow: 0 10px 6px ${COLORS.CARD_SHADOW1};
`

const SignUpButtonWrapper = styled.View`
  display: flex;
  justify-content: center;
`

const SignUpButton = styled.TouchableOpacity`
  background-color: ${COLORS.BASE_MUSCLEW};
  border-radius: 5px;
  padding: 20px 0;
  width: 80%;
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
  display: flex;
  justify-content: center;
`

const LoginButton = styled.TouchableOpacity`
  border: 2px solid ${COLORS.BASE_MUSCLEW};
  border-radius: 5px;
  padding: 20px 0;
  width: 80%;
  align-self: center;
`

const LoginText = styled.Text`
  color: ${COLORS.BASE_MUSCLEW};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

export default SignupHomeScreen;
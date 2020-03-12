import React from 'react'
import { Image, Text, Button } from 'react-native';
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
  background-color: ${COLORS.BASE_BACKGROUND};
  flex: 1;
  padding-top: 60px;
`

const ImageWrapper = styled.View`
  justify-content:center;
`

const SignUpCard = styled.View`
  border-radius: 10px;
  width: 90%;
  padding: 30px 0;
  margin-top: 30px;
  align-self: center;
  background-color: ${COLORS.BASE_BACKGROUND};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const SignUpButtonWrapper = styled.View`
  display: flex;
  justify-content: center;
`

const SignUpButton = styled.TouchableOpacity`
  background-color: ${COLORS.BASE_MUSCLEW};
  border-radius: 5px;
  padding: 15px 0;
  width: 80%;
  align-self: center;
`

const SignUpText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 20px;
`

const LoginSupportWrapper = styled.View`
  padding: 30px 0 15px 0;  
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
  padding: 15px 0;
  width: 80%;
  align-self: center;
`

const LoginText = styled.Text`
  color: ${COLORS.BASE_MUSCLEW};
  font-weight: bold;
  text-align: center;
  font-size: 20px;
`

export default SignupHomeScreen;
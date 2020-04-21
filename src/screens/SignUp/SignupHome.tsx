import React from 'react'
import { Image, Text } from 'react-native';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';

const TwitterTest = styled.TouchableOpacity`
`
const SignupHomeScreen = ({ navigation, route }) => {
  return (
    <Container>
      <ImageWrapper>
        <ImageLogoWrapper>
          <Image 
            source={require('../../assets/main_icon.png')}
            style={{ width: 60, height: 60, borderRadius: 60, resizeMode: 'contain', alignSelf: 'center' }}
          />
        </ImageLogoWrapper>
        <ImageTitleWrapper>
          <Image 
            source={require('../../assets/masukuru_title.png')}
            style={{ width: 120, height: 17, marginLeft: 10, borderRadius: 60, resizeMode: 'contain', alignSelf: 'center' }}
          />
        </ImageTitleWrapper>

      </ImageWrapper>

      <SignUpTitle>
        仲間と筋トレを共有しながら、
        {"\n"}{"\n"}
        仲間と理想のカラダへ
      </SignUpTitle>

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
  flex-direction: column;
  align-self: center;
  align-items: center;
`

const ImageLogoWrapper = styled.View`
  align-self: center;
`

const ImageTitleWrapper = styled.View`
  margin: 10px 20px 0 10px;
  align-self: center;
`

const SignUpTitle = styled.Text`
  width: 80%;
  margin: 0 auto;
  padding: 100px 0 0px 0px;
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 20px;
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
  padding: 17px 0;
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
  padding: 17px 0;
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
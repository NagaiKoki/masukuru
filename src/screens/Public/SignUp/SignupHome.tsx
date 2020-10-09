import React, { useState } from 'react'
import { Image } from 'react-native';
import SignUpModal from './SignUpModal';
import styled from 'styled-components';
import { COLORS } from '../../../constants/Styles';

const SignupHomeScreen = ({ navigation, route }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true)

  const handleOpenModal = (fromSignUp: boolean) => {
    setIsSignUp(fromSignUp)
    setIsVisible(true)
  }

  return (
    <Container>
      <ImageWrapper>
        <ImageLogoWrapper>
          <Image 
            source={require('../../../assets/main_icon.png')}
            style={{ width: 60, height: 60, borderRadius: 60, resizeMode: 'contain', alignSelf: 'center' }}
          />
        </ImageLogoWrapper>
        <ImageTitleWrapper>
          <Image 
            source={require('../../../assets/masukuru_title.png')}
            style={{ width: 120, height: 17, marginLeft: 10, borderRadius: 60, resizeMode: 'contain', alignSelf: 'center' }}
          />
        </ImageTitleWrapper>

      </ImageWrapper>

      <SignUpTitle>
        仲間とトレーニング
        {"\n"}{"\n"}
        仲間と理想のカラダへ
      </SignUpTitle>

      <SignUpCard>
        <SignUpButtonWrapper>
          <SignUpButton onPress={ () => handleOpenModal(true) }>
            <SignUpText>無料登録する</SignUpText>
          </SignUpButton>
        </SignUpButtonWrapper>

        <LoginSupportWrapper>
          <LoginSupprtText>もしアカウントをお持ちの場合は</LoginSupprtText>
        </LoginSupportWrapper>

        <LoginButtonWrapper>
          <LoginButton onPress={ () => handleOpenModal(false) }>
            <LoginText>ログインする</LoginText>
          </LoginButton>
        </LoginButtonWrapper>
      </SignUpCard> 

      <SignUpModal 
        isSignUp={isSignUp} 
        route={route} 
        navigation={navigation} 
        isVisible={isVisible} 
        setIsVisible={setIsVisible}
      />   
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
  padding: 80px 0 0px 0px;
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 25px;
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
  padding: 16px 0;
  width: 95%;
  align-self: center;
`

const SignUpText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 18px;
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
  padding: 16px 0;
  width: 95%;
  align-self: center;
`

const LoginText = styled.Text`
  color: ${COLORS.BASE_MUSCLEW};
  font-weight: bold;
  text-align: center;
  font-size: 18px;
`

export default SignupHomeScreen;
import React, { useState } from 'react'
import styled from 'styled-components'
// import selectors
import { useUserSelectors } from '../../../selectors/user'
// import components
import Button from '../../../common/Button'
import StepTitle from '../../../components/Tutorial/StepTitle'
import UserImage from '../../../components/Image/userImage'
// import constants
import { COLORS } from '../../../constants/Styles'
// import utils
import { ImageUpload } from '../../../utilities/cameraRoll'
// import config
import firebase from '../../../config/firebase';

const TutorialUserImage = ({ navigation }) => {
  const [progress, setProgress] = useState('')
  const [url, setUrl] = useState('')
  const { currentUser, requestUpdateUser } = useUserSelectors()
  const firebaseUser = firebase.auth().currentUser
  const PROFILE_TEXT = url ? '画像を変更する' : '画像を追加する'

  const handleUpload = () => {
    ImageUpload(setProgress, setUrl, firebaseUser)
  }

  const handleOnSubmit = () => {
    requestUpdateUser({ ...currentUser, imageUrl: url })
    navigation.navigate('TutorialGroupMake')
  }

  const renderImage =
    <ImageWrapper onPress={handleUpload}>
      <UserImage uri={url} width={100} height={100} borderRadius={ url ? 60 : 0 } forProfile={true} />
    </ImageWrapper>

  return (
    <Container>
      <Wrapper>
        <StepTitle 
          title="プロフィール画像を設定しよう！"
          stepCount={3}
        />
        <ImageContainer>
          {renderImage}
          <ImageTextBtn onPress={handleUpload}>
            <ImageText>{PROFILE_TEXT}</ImageText>
          </ImageTextBtn>
          { progress ? <ImageText>{progress}</ImageText> : null }
        </ImageContainer>
        <Button 
          text='次へ'
          fontSize={16}
          bold={true}
          padding='15px 0'
          handleOnClick={handleOnSubmit}
        />
      </Wrapper>
    </Container>
  )
}

export default TutorialUserImage

const Container = styled.View`
  flex: 1;
  background: ${COLORS.BASE_WHITE};
`

const Wrapper = styled.View`
  padding: 30px 15px;
`

const ImageContainer = styled.View`
  padding: 20px 0 30px 0;
`

const ImageWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
`

const ImageTextBtn = styled.TouchableOpacity`
`

const ImageText = styled.Text`
  padding-top: 15px;
  color: ${COLORS.BASE_MUSCLEW};
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`
import React, { useState } from 'react'
import styled from 'styled-components';
import { COLORS } from '../../../constants/Styles';
import UserImage from '../../../components/Image/userImage'
import { ImageUpload } from '../../../lib/cameraRoll';
import firebase, { db } from '../../../config/firebase';

const TutorialUserImageScreen = ({ navigation, userName }) => {
  const [progress, setProgress] = useState<string>('');
  const [uri, setUri] = useState<string>('');
  const user = firebase.auth().currentUser;

    // 写真追加の文字    
    const ChangeImageText = () => {
      let btnText = ''
      uri ? btnText = '写真を変更する' : btnText = '写真を追加する'
      
      return (
        <ChangeImageBtn block onPress={ () => ImageUpload(setProgress, setUri, user) } >
          <ChangeImageWord>{btnText}</ChangeImageWord>
        </ChangeImageBtn>   
        )
    }

    // ユーザーのphotUrlの更新処理
    const updatePhotoUrl = () => {
      user.updateProfile({
        photoURL: uri
      }).then(function() {
        const userdata  = { imageUrl: uri };
        db.collection('users').doc(user.uid).update(userdata);
      }).then(function() {
        navigation.navigate('TutorialUsage', { userName: userName })
      }).catch(function(error) {
        alert(error);
      })
    };
  
  return (
    <TutorialContainer>
      <TutorialStepTitle>
        - step 3 -
      </TutorialStepTitle>
      <TutorialTitle>
        プロフィール写真を登録しよう！
      </TutorialTitle>
      <TutorialProfileImageWrapper>
        <ImageUploadWrapper onPress={ () => ImageUpload(setProgress, setUri, user)}>
          <UserImage uri={uri} width={120} height={120} borderRadius={60} forProfile={true} />
        </ImageUploadWrapper>        
        <ImageProgressText>{progress}</ImageProgressText>
        {ChangeImageText()}
      </TutorialProfileImageWrapper>

      <TutorialNavigationContainer onPress={ () => updatePhotoUrl() }>
        <TutorialNavigationText>次へ</TutorialNavigationText>
      </TutorialNavigationContainer>
    </TutorialContainer>
  )
}

const TutorialContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const TutorialProfileImageWrapper = styled.View`
  padding-top: 30px;
`

const TutorialStepTitle = styled.Text`
  padding: 50px 0 40px 0;
  text-align: center;
  font-size: 14px;
  color: ${COLORS.SUB_BLACK};
`

const TutorialTitle = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  color: ${COLORS.BASE_BLACK};
`

const ImageUploadWrapper = styled.TouchableOpacity`
  width: 125px;
  align-self: center;
  border-radius: 60px;
`

const ImageProgressText = styled.Text`
  text-align: center;
  color: ${COLORS.BASE_MUSCLEW};
  font-size: 14px;
`

const ChangeImageBtn = styled.TouchableOpacity`
  width: 40%;
  align-self: center;
  padding: 10px;
  border-radius: 5px;
`

const ChangeImageWord = styled.Text`
  color: ${COLORS.BASE_MUSCLEW};
  text-align: center;
  font-weight: bold;
`

const TutorialNavigationContainer = styled.TouchableOpacity`
  width: 80%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 15px 0;
  border-radius: 60px;
  margin-top: 50px;
`

const TutorialNavigationText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

export default TutorialUserImageScreen;
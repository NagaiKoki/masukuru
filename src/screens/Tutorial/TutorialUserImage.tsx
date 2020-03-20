import React, { useState } from 'react'
import styled from 'styled-components';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../../constants/Styles';
import firebase from 'firebase';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import TutorialNavigator from '../../navigations/TutorialNavigator';

const TutorialUserImageScreen = ({ navigation }) => {
  const [progress, setProgress] = useState<string>('');
  const [uri, setUri] = useState<string>('');
  const user = firebase.auth().currentUser;
  
  const ImageUpload = async () => {
    const ImageName = `profile_image_${user.uid}`;
  
      if (IsCameraEnable) {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
          base64: false,
        });
        
        try  {
          if (!result.cancelled) {
            // visual studio codeの影響でエラーをはく。
            // TSの問題はないので一旦無視
            const localUri = await fetch(result.uri); 
            const localBlob = await localUri.blob();
            const filename = ImageName;
            const storageRef = firebase.storage().ref().child("image/" + filename);
      
            const uploadTask = storageRef.put(localBlob);
            uploadTask.on('state_changed', (snapshot) => {
              let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progress + '%');
            }, (error) => {
              console.log(error);
              alert(error);
            }, () => {
              uploadTask.snapshot.ref.getDownloadURL().then(downLoadURL => {
                setProgress('');
                setUri(downLoadURL);
              })
            })
          }
        } catch(error) {
          console.log(error);
          alert(error);
        }
      }
    }

    // カメラロールの許可判定
    const IsCameraEnable = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        console.log(status)
        if (status !== 'granted') {
          alert("カメラロールを許可してください。");
          return false;
        } else {
          return true;
        };
      };
    }

  // 写真がアップされれば、その写真を表示する
  const isProfileUploaded = (
    uri ? <Image 
           source={{ uri: uri }}
           style={{ width: 120, height: 120, borderRadius: 60, resizeMode: 'cover', alignSelf: 'center' }}
          /> :

          <Image 
            source={require('../../assets/profileImageRegister.png')}
            style={{ width: 120, height: 100, resizeMode: 'contain', alignSelf: 'center' }}
          />
        );

    // 写真追加の文字    
    const ChangeImageText = () => {
      let btnText = ''
      uri ? btnText = '写真を変更する' : btnText = '写真を追加する'
      
      return (
        <ChangeImageBtn block onPress={ () => ImageUpload() }>
            <ChangeImageWord>{btnText}</ChangeImageWord>
        </ChangeImageBtn>   
        )
    }

    // ユーザーのphotUrlの更新処理
    const updatePhotoUrl = () => {
      user.updateProfile({
        photoURL: uri
      }).then(function() {
        navigation.navigate('')
      }).catch(function(error) {
        alert(error);
      })
    };
  
  return (
    <TutorialContainer>
      <TutorialProfileImageWrapper>
        <ImageUploadWrapper onPress={() => ImageUpload()}>
          {isProfileUploaded}
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
  padding-top: 130px;
`

const ImageUploadWrapper = styled.TouchableOpacity`
  width: 125px;
  align-self: center;
  border-radius: 60;
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
  padding: 20px 0;
  border-radius: 5px;
  margin-top: 50px;
`

const TutorialNavigationText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

export default TutorialUserImageScreen;
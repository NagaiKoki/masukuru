import React, { useState } from 'react';
import styled from 'styled-components';
import { Image } from 'react-native';
import UserImage from '../../components/Image/userImage';
import { ImageUpload } from '../../lib/cameraRoll';
import { db } from '../../config/firebase';
import { COLORS } from '../../constants/Styles';

const ProfileChangeScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [progress, setProgress] = useState<string>('');
  const [uri, setUri] = useState<string>(user.photoURL);
  const [userName, setUserName] = useState<string>(user.displayName)

    // 写真追加の文字    
    const ChangeImageText = () => {
      let btnText = ''
      uri || user.photoURL ? btnText = '写真を変更する' : btnText = '写真を追加する'
      
      return (
        <ChangeImageBtn block onPress={ () => ImageUpload(user, setProgress, setUri) } >
            <ChangeImageWord>{btnText}</ChangeImageWord>
        </ChangeImageBtn>   
        )
    }

    const renderUserNameForm = (  
        <UserNameForm 
          placeholder='名前を入力する（3文字以上）'
          value={userName}
          autoCapitalize={'none'}
          autoCorrect={ false }
          onChangeText={ text => setUserName(text) }
        />
      )

    // ユーザーの更新処理
    const updateUserProfile = () => {
      user.updateProfile({
        displayName: userName,
        photoURL: uri
      }).then(function() {
        const userdata  = { imageUrl: uri, name: userName };
        db.collection('users').doc(user.uid).update(userdata);
      }).then(function() {
        navigation.replace('マイページ')
      }).catch(function(error) {
        alert(error);
      })
    };

  return (
    <ProfileChangeContainer>
      <ProfileImageWrapper>
        <ImageUploadWrapper onPress={ () => ImageUpload(user, setProgress, setUri)}>
          <UserImage uri={uri} user={user} width={120} height={120} borderRadius={60} forProfile={true} />
        </ImageUploadWrapper>        
        <ImageProgressText>{progress}</ImageProgressText>
        {ChangeImageText()}
      </ProfileImageWrapper>

      <UserNameFormWrapper>
        {renderUserNameForm}
      </UserNameFormWrapper>

      <ProfileChangeSubmitBtn block onPress={ () => updateUserProfile() }>
        <ProfileChangeSubmitText>変更する</ProfileChangeSubmitText>
      </ProfileChangeSubmitBtn>
    </ProfileChangeContainer>
  )
}

const ProfileChangeContainer = styled.View`
  background-color: ${COLORS.BASE_BACKGROUND};
  flex: 1;
`
// image style
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

const ProfileImageWrapper = styled.View`
  padding-top: 50px;
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

// user name style
const UserNameFormWrapper = styled.View`
  align-self: center;
  margin-top: 30px;
  width: 80%;
`

const UserNameForm = styled.TextInput`
  border: 1px solid ${COLORS.BASE_BORDER_COLOR};
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  background-color: ${COLORS.BASE_WHITE};
`

const ProfileChangeSubmitBtn = styled.TouchableOpacity`
  width: 80%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 20px 0;
  border-radius: 5px;
  margin-top: 50px;
`
const ProfileChangeSubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

export default ProfileChangeScreen;

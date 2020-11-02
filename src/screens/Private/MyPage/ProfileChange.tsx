import React, { useState } from 'react';
import styled from 'styled-components';
// import apis
import { requestUpdateUser } from '../../../apis/Users'
// import components
import UserImage from '../../../components/Image/userImage';
import Form from '../../../common/Form'
// import utils
import { ImageUpload } from '../../../utilities/cameraRoll';
// import constants
import { COLORS } from '../../../constants/Styles';
// import types
import { UserType } from '../../../types/User';
// import config
import firebase from '../../../config/firebase'

const ProfileChangeScreen = ({ route, navigation }) => {
  const { user }: { user: UserType } = route.params;
  const userImageUrl = user ? user.imageUrl : ''
  const name = user ? user.name : ''
  const [progress, setProgress] = useState<string>('');
  const [uri, setUri] = useState<string>(userImageUrl);
  const [userName, setUserName] = useState<string>(name)
  const firebaseUser = firebase.auth().currentUser

  // 写真追加の文字    
  const ChangeImageText = () => {
    let btnText = ''
    uri || user.imageUrl ? btnText = '写真を変更する' : btnText = '写真を追加する'
    
    return (
      <ChangeImageBtn block onPress={ () => ImageUpload(setProgress, setUri, user) } >
          <ChangeImageWord>{btnText}</ChangeImageWord>
      </ChangeImageBtn>   
      )
  }
    
  // ユーザーの更新処理
  const updateUserProfile = async () => {
    await requestUpdateUser(userName, uri)
    navigation.goBack('MyPage')
  };

  return (
    <ProfileChangeContainer>
      <ProfileImageWrapper>
        <ImageUploadWrapper onPress={() => ImageUpload(setProgress, setUri, user)}>
          <UserImage uri={uri} user={firebaseUser} width={100} height={100} borderRadius={60} forProfile={true} />
        </ImageUploadWrapper>        
        <ImageProgressText>{progress}</ImageProgressText>
        {ChangeImageText()}
      </ProfileImageWrapper>
      <UserNameFormWrapper>
        <Form
          placeholder='名前を入力する（3文字以上 8字以下）'
          value={userName}
          maxLength={8}
          onChange={setUserName}
        />
      </UserNameFormWrapper>
      <ProfileChangeSubmitBtn onPress={updateUserProfile}>
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
  width: 110px;
  height: 110px;
  align-self: center;
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
  width: 90%;
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
  padding: 15px 0;
  border-radius: 60px;
  margin-top: 50px;
`
const ProfileChangeSubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

export default ProfileChangeScreen;

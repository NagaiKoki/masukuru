import React from 'react';
import styled from 'styled-components';
import { Image } from 'react-native';
import UserImage from '../../components/Image/userImage';

const ProfileChangeScreen = ({ route, navigation }) => {
  const { user } = route.params;

  return (
    <ProfileChangeContainer>
      <UserImage user={user} width={100} height={100} borderRadius={60} forProfile={true} />
    </ProfileChangeContainer>
  )
}

const ProfileChangeContainer = styled.View`
`
const UserImageWrapper = styled.View`
  align-self: center;
`

export default ProfileChangeScreen;

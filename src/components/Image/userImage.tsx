import React from 'react';
import { Image } from 'react-native';
// import config
import firebase from '../../config/firebase'

interface UserImageProps {
  uri?: string,
  user?: firebase.User
  width: number
  height: number
  borderRadius: number
  forProfile?: boolean
}

const UserImage = (props: UserImageProps) => {
  const { uri, user, width, height, borderRadius, forProfile } = props;
  if (uri) {
    return (
      <Image source={{ uri }}
        style={{ width, height, borderRadius, resizeMode: 'cover' }}
      />
    )
  } else if (user && user.photoURL) {
    return (
      <Image source={{ uri: user.photoURL }}
        style={{ width, height, borderRadius, resizeMode: 'cover' }}
      />
    )
  } else if (forProfile) {
    return (
      <Image source={require('../../assets/addUserImage.png')}
        style={{ width, height, borderRadius, resizeMode: 'contain' }}
      />
    )
  } else {
    return (
      <Image source={require('../../assets/profileDefaultImage.png')}
        style={{ width, height, borderRadius, resizeMode: 'contain' }}
      />
    )
  }
}

export default UserImage;
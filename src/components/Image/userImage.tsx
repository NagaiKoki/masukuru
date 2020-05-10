import React from 'react';
import { Image } from 'react-native';
import firebase from 'firebase'

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
      <Image source={{ uri: uri }}
           style={{ width: width, height: height, borderRadius: borderRadius, resizeMode: 'cover' }}
      />
    )
  } else if (user && user.photoURL) {
    return (
      <Image source={{ uri: user.photoURL }}
             style={{ width: width, height: height, borderRadius: borderRadius, resizeMode: 'cover' }}
      />
    )
  } else if (forProfile) {
    return (
      <Image source={require('../../assets/profileImageRegister.png')}
             style={{ width: width, height: height, borderRadius: borderRadius, resizeMode: 'contain' }}
      />
    )
  } else {
    return (
      <Image source={require('../../assets/profileDefaultImage.png')}
             style={{ width: width, height: height, borderRadius: borderRadius, resizeMode: 'contain' }}
      />
    )
  }
}

export default UserImage;
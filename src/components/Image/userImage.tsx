import React from 'react';
import { Image } from 'react-native';
import firebase from 'firebase'

interface UserImageProps {
  user: firebase.User
  width: number
  height: number
  borderRadius: number
  forProfile?: boolean
}

const UserImage = (props: UserImageProps) => {
  const { user, width, height, borderRadius, forProfile } = props;
  if (user.photoURL) {
    return (
      <Image source={{ uri: user.photoURL }}
             style={{ width: width, height: height, borderRadius: borderRadius, resizeMode: 'cover', alignSelf: 'center' }}
      />
    )
  } else if (forProfile) {
    return (
      <Image source={require('../../assets/profileImageRegister.png')}
             style={{ width: width, height: height, borderRadius: borderRadius, resizeMode: 'contain', alignSelf: 'center' }}
      />
    )
  } else {
    return (
      <Image source={require('../../assets/profileDefaultImage.png')}
             style={{ width: width, height: height, borderRadius: borderRadius, resizeMode: 'contain', alignSelf: 'center' }}
      />
    )
  }
}

export default UserImage;
import React, { useEffect } from 'react';
import { View } from 'native-base';
import { ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'firebase';

const LoginLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      navigation.navigate(user ? 'Home' : 'Home');
    })
  }, [])

  return (
    <View>
      <ActivityIndicator />
    </View>
  )
};

export default LoginLoadingScreen;
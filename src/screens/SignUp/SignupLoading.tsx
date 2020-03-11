import React, { useEffect } from 'react';
import { View } from 'native-base';
import { ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'firebase';

const SignupLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      navigation.navigate(user ? 'Home' : 'SignUp');
    })    
  }, [])

  return (
    <View>
      <ActivityIndicator />
    </View>
  )
};

export default SignupLoadingScreen;
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import styled from 'styled-components';
import firebase from 'firebase';
import { COLORS } from '../../constants/Styles';

const LoginLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      navigation.replace('Home');
    })
  }, [])

  return (
      <ActivityIndicator size="large" style={[styles.loading]}/>
  )
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BASE_BACKGROUND
  }
})

export default LoginLoadingScreen;
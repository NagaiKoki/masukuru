import React, { useEffect } from 'react';
import { View } from 'native-base';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import firebase from 'firebase';

const LoginLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      navigation.navigate(user ? 'Home' : 'Home');
    })
  }, [])

  return (
    <LoadingContainer>
      <ActivityIndicator size="large"/>
    </LoadingContainer>
  )
};

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  background-color: #fff5ee;

`

export default LoginLoadingScreen;
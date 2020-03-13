import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';
import firebase from 'firebase';

const SignupLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      navigation.navigate(user ? 'Home' : 'Signup');
    })    
  }, [])

  return (
    <LoadingContainer>
      <ActivityIndicator/>
    </LoadingContainer>
  )
};

const LoadingContainer = styled.View`
  flex: 1;
  align-self: center;
  
  /* justify-content: 'center';
  align-items: 'center'; */
`

export default SignupLoadingScreen;
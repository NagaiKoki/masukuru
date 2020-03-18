import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';
import firebase from 'firebase';

const SignupLoadingScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setIsLoading(false);
      navigation.navigate(user ? 'Tutorial' : 'Signup');
    })    
  }, [])

  console.log(isLoading);

  return (
    <LoadingContainer>
      <ActivityIndicator size="large"/>
    </LoadingContainer>
  )
};

const LoadingContainer = styled.View`
  flex: 1;
  align-self: center;
  align-items: center;
  /* justify-content: 'center';
  align-items: 'center'; */
`

export default SignupLoadingScreen;
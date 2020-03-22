import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import firebase from 'firebase';

const SignupLoadingScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setIsLoading(false);
      navigation.replace('Home');
    })    
  }, [])

  console.log(isLoading);

  return (    
    <LoadingContainer>
      <ActivityIndicator size="large" style={[styles.loading]} />
    </LoadingContainer>
  )
};

const LoadingContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BASE_BACKGROUND
  }
})

export default SignupLoadingScreen;
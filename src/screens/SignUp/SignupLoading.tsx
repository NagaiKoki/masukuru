import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import firebase from 'firebase';

const SignupLoadingScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Tutorial');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        alert('登録に失敗しました。')
      }
    })
  }, [])

  if (isLoading) {
    return (   
      <ActivityIndicator size="large" style={[styles.loading]} />
    )
  } else {
    return (null);
  }
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BASE_BACKGROUND
  }
})

export default SignupLoadingScreen;
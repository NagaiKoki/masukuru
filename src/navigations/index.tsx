import React, { useState, useLayoutEffect, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticationNavigator from './AuthentificationNavigator';
import MainTabNavigator from './MainTabNavigator';
import styled from 'styled-components';
import { ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '../config/firebase';
import { COLORS } from '../constants/Styles';

const Navigator = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    })
  }, [])

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size='large' style={[ styles.loading ]} />
      </LoadingContainer>
    )
  }

  const RootStack = createStackNavigator();

  const defaultScreen = () => {
    if (user ) {
      return (
        <RootStack.Screen 
          name="MainTabNavigator" 
          component={MainTabNavigator}
          options={{
            headerShown: false
          }}
        />
      )
    } else {
      return (
        <RootStack.Screen 
          name="AuthenticationNavigator" 
          component={AuthenticationNavigator}
          options={{
          headerShown: false
          }}
        />
      )
    }
  }

  const RootStackNavigator = () => (
    <RootStack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      {defaultScreen()}
    </RootStack.Navigator>
  )
  
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
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

const LoadingContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND}
`

export default Navigator;
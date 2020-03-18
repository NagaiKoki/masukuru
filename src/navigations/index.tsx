import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticationNavigator from './AuthentificationNavigator';
import MainTabNavigator from './MainTabNavigator';
import TutorialNavigator from './TutorialNavigator';
import { ActivityIndicator, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';
import { Root } from 'native-base';

const Navigator = () => {
  const [isUserSignIn, setIsUserSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setIsUserSignIn(true)
        setIsLoading(false)
      } else {
        setIsUserSignIn(false)
        setIsLoading(false)
      }
    })
  }, [])
  
  if (isLoading) {
    return (
      <ActivityIndicator size='large' style={[styles.loading]}/>
    )
  }

  const RootStack = createStackNavigator();
  const RootStackNavigator = ({ isUserSignIn }) => (
    <RootStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false
      }}
    >
      {isUserSignIn ? (
        <RootStack.Screen 
          name="MainTabNavigator" 
          component={MainTabNavigator} 
        />
      ) : (
        <RootStack.Screen 
          name="AuthenticationNavigator" 
          component={AuthenticationNavigator}
          options={{
            headerShown: false
          }}
         /> 
      ) }
    </RootStack.Navigator>
  )
  
  return (
    <NavigationContainer>
      <RootStackNavigator isUserSignIn={isUserSignIn} />
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center'
  }
})

export default Navigator;
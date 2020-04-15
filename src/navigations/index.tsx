import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationNavigator from './AuthentificationNavigator';
import TutorialNavigator from './TutorialNavigator'
import MainTabNavigator from './MainTabNavigator';
import styled from 'styled-components';
import { ActivityIndicator, StyleSheet, View,  Text } from 'react-native'
import DrawerContent from '../screens/Drawers/DrawerContents';
import firebase, { db } from '../config/firebase';
import { COLORS } from '../constants/Styles';

const Navigator = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setUser] = useState(null);
  const [isChange, setIsChange] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        setIsChange(false)
        setIsLoading(false);
      } else {
        setUser(null)
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

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const defaultSignedInScreen = () => {
    return (
      <Drawer.Screen 
        name="MainTabNavigator" 
        component={MainTabNavigator}
     />
    )
  }

  const defaultTutorialScreen = () => {
    return (
      <Stack.Screen
        name="Tutorial"
        component={TutorialNavigator}
        initialParams={{ setIsChange: setIsChange }}
        options={{
          headerShown: false
        }}
      />
    )
  }

  const defaultSignedOutScreen = () => {
    return (
      <Stack.Screen 
      name="AuthenticationNavigator" 
      initialParams={{ setIsChange: setIsChange }}
      component={AuthenticationNavigator}
      options={{
        headerShown: false
      }}
    />
    )
  }

  const RootStackNavigator = () => {
    if (currentUser && currentUser.displayName) {
      return (
        <Drawer.Navigator 
          drawerStyle={{ width: 330 }} 
          drawerContent={ (props) => <DrawerContent user={currentUser} {...props}/>}
        >
          {defaultSignedInScreen()}
        </Drawer.Navigator>
      )
    } else if (currentUser && !currentUser.displayName) {
      return (
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
          {defaultTutorialScreen()}
        </Stack.Navigator>
      )
    } else {
      return (
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
          {defaultSignedOutScreen()}
        </Stack.Navigator>
      )
    }
  }

  return (
    <NavigationContainer>
      {RootStackNavigator()}
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
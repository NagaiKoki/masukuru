import React, { useState, useLayoutEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import TutorialNavigator from './TutorialNavigator';
import firebase from '../config/firebase'
import SignOutLoadingScreen from '../screens/SignOut/SignoutLoading';

const MainNavigator = () => { 
  const MainStack = createStackNavigator()
  const [initialNav, setInitialNav] = useState<string>('Home')
  const [loading, setloading] = useState(true)

  useLayoutEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user && user.displayName === null) {
        setInitialNav('Tutorial');
        setloading(false);
      } else {
        setloading(false);
      }
    })
  })
  
  if (loading) {
    return (
      <ActivityIndicator size="large" style={[styles.loading]} />
    )
  }
 
  return (
    <MainStack.Navigator
      initialRouteName={initialNav}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}
    >
      <MainStack.Screen name="Tutorial" component={TutorialNavigator} />
  
      <MainStack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
      />

    {/* ログアウト */}
    <MainStack.Screen name="SignoutLoading" component={SignOutLoadingScreen} />

    </MainStack.Navigator>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center'
  }
})

export default MainNavigator;
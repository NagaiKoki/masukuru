import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import MyPageScreen from '../screens/MyPage/MyPage';
import RankingScreen from '../screens/Ranking/Ranking';
import MainTabNavigator from './MainTabNavigator';
import TutorialNavigator from './TutorialNavigator';
import InviteNavigator from './InviteNavigator';
import firebase from '../config/firebase'

const MainNavigator = () => { 
  const MainStack = createStackNavigator()
  const [isloggedIn, setIsLoggedIn] = useState<boolean>(true)
  const [isLoading, setIsloading] = useState(true)
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user && user.displayName) { 
        setIsLoggedIn(true)
        setIsloading(false)
      } else {
        setIsLoggedIn(false)
        setIsloading(false)
      }
    })
  })

  if (isLoading) {
    return (
      <ActivityIndicator size='large' style={[ styles.loading ]} />
    )
  }
  return (
    <MainStack.Navigator
      initialRouteName={isloggedIn ? 'Home' : 'Tutorial'}
      screenOptions={{
        headerShown: false
      }}
    >
    
      <MainStack.Screen name="Invite" component={InviteNavigator} />
      <MainStack.Screen name="Tutorial" component={TutorialNavigator} />
      <MainStack.Screen name="Ranking" component={RankingScreen} />

      <MainStack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          headerShown: false
        }}
      />

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
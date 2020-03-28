import React, { useState, useLayoutEffect } from 'react';
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
import SignOutLoadingScreen from '../screens/SignOut/SignoutLoading';

const MainNavigator = () => { 
  const MainStack = createStackNavigator()
  const [initialNav, setInitialNav] = useState<string>('SignoutLoading')
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
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import MyPageScreen from '../screens/MyPage/MyPage';
import RankingScreen from '../screens/Ranking/Ranking';
import MainTabNavigator from './MainTabNavigator';
import TutorialNavigator from './TutorialNavigator';
import firebase from 'firebase';

const MainStack = createStackNavigator()

const MainNavigator = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  let initialNav = "";
  const user = firebase.auth().currentUser
  
  if (user.displayName !== null) {
    initialNav = "TutorialGroupMake";
  } else {
    initialNav = "TutorialGroupMake";
  };

  return (
    <MainStack.Navigator
      initialRouteName={initialNav}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Tutorial" component={TutorialNavigator} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Ranking" component={RankingScreen} />
    </MainStack.Navigator>
  );
}

export default MainNavigator;
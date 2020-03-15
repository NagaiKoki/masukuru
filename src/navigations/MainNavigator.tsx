import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import MyPageScreen from '../screens/MyPage/MyPage';
import RankingScreen from '../screens/Ranking/Ranking';
import MainTabNavigator from './MainTabNavigator';

const MainNavigator = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Ranking" component={RankingScreen} />
    </Stack.Navigator>
  );
}

export default MainNavigator;
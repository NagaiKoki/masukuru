import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import MainNavigator from './MainNavigator';
import MyPageScreen from '../screens/MyPage/MyPage';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name='Home' component={MainNavigator} />
      <Tab.Screen name='Mypage' component={MyPageScreen} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator
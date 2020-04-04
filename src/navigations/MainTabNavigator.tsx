import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import MainNavigator from './MainNavigator';
import MyPageScreen from '../screens/MyPage/MyPage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { COLORS } from '../constants/Styles';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator 
      initialRouteName='ホーム'
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName: string;
          if (route.name === 'ホーム') {
            iconName = 'home'
          } else if (route.name === 'マイページ') {
                iconName = 'user'
          }
          focused
          ? color = `${COLORS.BASE_MUSCLEW}`
          : color = `${COLORS.SUB_BLACK}`
          return <Icon name={iconName} size={24} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: `${COLORS.BASE_MUSCLEW}`,
        inactiveTintColor: `${COLORS.SUB_BLACK}`,
        style: {
          height: 90,
          paddingTop: 10
        }
      }}
    >
      <Tab.Screen 
        name='ホーム' 
        component={MainNavigator}
      />
      <Tab.Screen name='マイページ' component={MyPageScreen} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator
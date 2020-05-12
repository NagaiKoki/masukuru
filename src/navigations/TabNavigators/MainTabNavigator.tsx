import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainNavigator from '../MainNavigator';
import RecordNavigator from './Records/RecordNavigator'
import NotificationNavigator from './NotificationNavigator';
import MyPageNavigator from './MyPageNavigator';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { COLORS } from '../../constants/Styles';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator 
      initialRouteName='ホーム'
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName: string;
          if (route.name === 'ホーム') {
            iconName = 'people'
          } else if (route.name === 'マイページ') {
            iconName = 'user'
          } else if (route.name === 'きろく') {
            iconName = 'chart'
          } else if (route.name === 'おしらせ') {
            iconName = 'bell'
          }
          focused
          ? color = `${COLORS.BASE_MUSCLEW}`
          : color = `${COLORS.SUB_BLACK}`
          return <Icon name={iconName} size={23} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: `${COLORS.BASE_MUSCLEW}`,
        inactiveTintColor: `${COLORS.SUB_BLACK}`,
        style: {
          height: '9%',
          paddingTop: '3%',
          paddingBottom: -1
        }
      }}
    >
      <Tab.Screen 
        name='ホーム' 
        component={MainNavigator}
        options={{
          tabBarLabel: '' 
        }}
      />

      <Tab.Screen 
        name='きろく' 
        component={RecordNavigator}
        options={{
          tabBarLabel: '' 
        }}
      />

      <Tab.Screen 
        name='おしらせ' 
        component={NotificationNavigator}
        options={{
          tabBarLabel: '' 
        }}
      />

      <Tab.Screen 
        name='マイページ' 
        component={MyPageNavigator} 
        options={{
          tabBarLabel: '' 
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator
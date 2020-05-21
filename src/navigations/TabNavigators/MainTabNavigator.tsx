import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainNavigator from '../Home/MainNavigator';
import RecordNavigator from './recordNavigator'
import NotificationNavigator from './NotificationNavigator';
import MyPageNavigator from './MyPageNavigator';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { COLORS } from '../../constants/Styles';
// import containers
import NotificationBatchIcon from '../../containers/notifications'

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {

  useFocusEffect(
    useCallback(() => {
    }, [])
  )

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
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => {
            const color = focused ?  COLORS.BASE_MUSCLEW : COLORS.SUB_BLACK
            return (
              <React.Fragment>
                <NotificationBatchIcon />
                <Icon name='bell' size={23} color={color} />
              </React.Fragment>
              )
            }
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
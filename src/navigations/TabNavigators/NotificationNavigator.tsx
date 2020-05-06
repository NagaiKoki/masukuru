import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationScreen from '../../screens/Notifications/'
import { COLORS } from '../../constants/Styles'


const NotificationNavigator = () => {
  const NotificationStack = createStackNavigator();

  return (
    <NotificationStack.Navigator initialRouteName='おしらせ'>
      <NotificationStack.Screen
        name="notification"
        component={NotificationScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'おしらせ',
          headerTintColor: COLORS.BASE_MUSCLEW
        }}
      />
{/* 
      <NotificationStack.Screen
        name="menu"
        component={MenuScreen}
        options={({route}) => ({
          headerBackTitleVisible: false,
          headerTitle: 'おしらせ',
          headerTintColor: COLORS.BASE_MUSCLEW
        })}
      /> */}
    </NotificationStack.Navigator>
  )
}

export default NotificationNavigator;
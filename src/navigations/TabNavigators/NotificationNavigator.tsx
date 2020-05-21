import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationScreen from '../../screens/Notifications'
import NotificationContentScreen from '../../screens/Notifications/NotificationContent';
import { COLORS } from '../../constants/Styles'


const NotificationNavigator = () => {
  const NotificationStack = createStackNavigator();

  return (
    <NotificationStack.Navigator initialRouteName='おしらせ'>
      <NotificationStack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'おしらせ',
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        }}
      />

      <NotificationStack.Screen
        name="NotificationContent"
        component={NotificationContentScreen}
        options={({route}) => ({
          headerBackTitleVisible: false,
          headerTitle: 'おしらせ',
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        })}
      />
    </NotificationStack.Navigator>
  )
}

export default NotificationNavigator;
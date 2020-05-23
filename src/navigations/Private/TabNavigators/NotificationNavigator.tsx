import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationScreen from '../../../screens/Private/Notifications'
import { COLORS } from '../../../constants/Styles'
// import container
import NotificationContainer from '../../../containers/Private/notifications'


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
        component={NotificationContainer}
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
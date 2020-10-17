import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationContainer from '../../../containers/Private/notifications'
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../../constants/Styles'
// import screens
import NotificationContentScreen from '../../../screens/Private/Notifications/NotificationContent'
import NotificationRecordShowScreen from '../../../screens/Private/Records/Show'


const NotificationNavigator = ({ navigation }) => {
  const NotificationStack = createStackNavigator();

  return (
    <NotificationStack.Navigator initialRouteName='おしらせ'>
      <NotificationStack.Screen
        name="Notification"
        component={NotificationContainer}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'おしらせ',
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
          headerLeft: () => (
            <Icon name="bars" 
                  size={24} 
                  onPress={() => { navigation.openDrawer() }} 
                  style={{ paddingLeft: 20, color: COLORS.BASE_WHITE }}
            />
          ),
        }}
      />

      <NotificationStack.Screen
        name="NotificationContent"
        component={NotificationContentScreen}
        options={() => ({
          headerBackTitleVisible: false,
          headerTitle: 'おしらせ',
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        })}
      />

      <NotificationStack.Screen
        name="notificationRecordShow"
        component={NotificationRecordShowScreen}
        options={() => ({
          headerBackTitleVisible: false,
          headerTitle: 'きろく',
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
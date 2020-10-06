import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { COLORS } from '../../constants/Styles';
// import containers
import NotificationBatchIcon from '../../containers/Private/notifications/batch'
// import navigators
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainNavigator from './Home/MainNavigator';
import ChartNavigator from './Chart'
import NotificationNavigator from './Notification';
import MyPageNavigator from './MyPage';
// import store
import store from '../../reducers'
// import actions
import { requestFetchNotReadNotificationNumber } from '../../actions/notifications'

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  useFocusEffect(
    useCallback(() => {
      store.dispatch(requestFetchNotReadNotificationNumber())
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
          return <Icon name={iconName} size={25} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: `${COLORS.BASE_MUSCLEW}`,
        inactiveTintColor: `${COLORS.SUB_BLACK}`,
        style: {
          height: "8%",
          paddingTop: 6,
          paddingBottom: -2
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
        component={ChartNavigator}
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
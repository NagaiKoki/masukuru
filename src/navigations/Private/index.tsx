import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import constants
import { COLORS } from '../../constants/Styles';
// import containers
import NotificationBatchIcon from '../../containers/Private/notifications/batch'
// import navigators
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './Home';
import ChartNavigator from './Chart'
import NotificationNavigator from './Notification';
import MyPageNavigator from './MyPage';
// import actions
import { requestFetchNotReadNotificationNumber } from '../../slice/notification'
// import utils
import { lessThanIphoneEightHeight } from '../../utilities/Device'

const Tab = createBottomTabNavigator();
const MainTabNavigator = () => {
  const dispatch = useDispatch()  

  useFocusEffect(
    useCallback(() => {
      dispatch(requestFetchNotReadNotificationNumber())
    }, [])
  )

  return (
    <Tab.Navigator 
      initialRouteName='ホーム'
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName: string;
          if (route.name === 'ホーム') {
            iconName = 'home'
          } else if (route.name === 'MyPage') {
            iconName = 'person'
          } else if (route.name === 'きろく') {
            iconName = 'equalizer'
          }
          focused
          ? color = `${COLORS.BASE_MUSCLEW}`
          : color = `${COLORS.SUB_BLACK}`
          return <Icon name={iconName} size={27} color={color} />;
        },
        lazy: true
      })}
      tabBarOptions={{
        activeTintColor: `${COLORS.BASE_MUSCLEW}`,
        inactiveTintColor: `${COLORS.SUB_BLACK}`,
        style: {
          height: lessThanIphoneEightHeight() ? 65 : 77,
          paddingTop: 10,
          paddingBottom: lessThanIphoneEightHeight() ? 10 : 22,
        },
      }}
    >
      <Tab.Screen 
        name='ホーム' 
        component={HomeNavigator}
        options={{
          tabBarLabel: 'ホーム' 
        }}
      />

      <Tab.Screen 
        name='きろく' 
        component={ChartNavigator}
        options={{
          tabBarLabel: 'きろく' 
        }}
      />

      <Tab.Screen 
        name='おしらせ' 
        component={NotificationNavigator}
        options={{
          tabBarLabel: 'お知らせ',
          tabBarIcon: ({ focused }) => {
            const color = focused ?  COLORS.BASE_MUSCLEW : COLORS.SUB_BLACK
            return (
              <React.Fragment>
                <NotificationBatchIcon />
                <Icon name='notifications' size={23} color={color} />
              </React.Fragment>
              )
            }
        }}
      />

      <Tab.Screen 
        name='MyPage' 
        component={MyPageNavigator} 
        options={{
          tabBarLabel: 'マイページ' 
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator
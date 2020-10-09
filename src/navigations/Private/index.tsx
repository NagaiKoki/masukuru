import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
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
import { requestFetchNotReadNotificationNumber } from '../../actions/notifications'

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
            iconName = 'people'
          } else if (route.name === 'MyPage') {
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
        component={HomeNavigator}
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
        name='MyPage' 
        component={MyPageNavigator} 
        options={{
          tabBarLabel: '' 
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator
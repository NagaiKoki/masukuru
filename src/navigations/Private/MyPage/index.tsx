import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import screens
import MyPageScreen from '../../../screens/Private/MyPage/MyPage'
import ProfileChangeScreen from '../../../screens/Private/MyPage/ProfileChange';
import RecordShowScreen from '../../../screens/Private/Records/Show'
import MyPageSettingScreen from '../../../screens/Private/MyPage/Setting'
import SettingPushScreen from '../../../screens/Private/Setting/Push'
import GoalSettingScreen from '../../../screens/Private/Charts/Setting'
// import components
import StackNavigator from '../../../common/Navigator/StackNavigator'
// import constants
import { COLORS } from '../../../constants/Styles'

const MyPageNavigator = ({ navigation }) => { 
  const MyPageStack = createStackNavigator()
  
  return (
    <StackNavigator Stack={MyPageStack} initialRouteName='MyPage'>
      <>
       <MyPageStack.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW,
          },
          headerTintColor: COLORS.BASE_WHITE,
          headerTitle: 'マイページ',
          headerLeft: () => (
            <Icon name="bars" 
                  size={24} 
                  onPress={() => { navigation.openDrawer() }} 
                  style={{ paddingLeft: 20, color: COLORS.BASE_WHITE }}
            />
          ),
          headerRight: () => (
            <EvilIcons name="gear" 
                  size={24} 
                  onPress={() => { navigation.navigate('myPageSetting') }} 
                  style={{ paddingRight: 15, color: COLORS.BASE_WHITE }}
            />
          ),
          gestureEnabled: false,
        }}
      />
      
      <MyPageStack.Screen
        name="プロフィール編集"
        component={ProfileChangeScreen}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        }}
      />

      <MyPageStack.Screen 
        name="recordShow"
        component={RecordShowScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "きろく",
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        }}
      />

      <MyPageStack.Screen 
        name="myPageSetting"
        component={MyPageSettingScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: '設定',
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        }}
      />

      <MyPageStack.Screen 
        name="myPageSetting"
        component={MyPageSettingScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: '設定',
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        }}
      />

      <MyPageStack.Screen 
        name="myPagePushSetting"
        component={SettingPushScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'プッシュ通知',
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        }}
      />
      </>
    </StackNavigator>
  );
}

export default MyPageNavigator;
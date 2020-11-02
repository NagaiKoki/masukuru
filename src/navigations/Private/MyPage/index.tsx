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
import ProfileSettingPrivacyScreen from '../../../screens/Private/MyPage/Setting/Privacy'
// import components
import StackNavigator from '../../../common/Navigator/StackNavigator'
import HeaderIconButton from '../../../common/Button/HeaderIconButton'
// import utils
import { navigatorOptions } from '../../../utilities/navigatorOptions'

const MyPageNavigator = ({ navigation }) => { 
  const MyPageStack = createStackNavigator()
  
  return (
    <StackNavigator Stack={MyPageStack} initialRouteName='MyPage'>
      <>
       <MyPageStack.Screen
        name="MyPage"
        component={MyPageScreen}
        options={navigatorOptions('マイページ', {
          headerLeft: () => (
            <HeaderIconButton iconName="navicon" type='left' onPress={() => navigation.openDrawer()} />
          ),
          headerRight: () => (
            <HeaderIconButton iconName="gear" type="right" onPress={() => navigation.navigate('myPageSetting')} />
          ),
          gestureEnabled: false,
         })}
      />
      
      <MyPageStack.Screen
        name="profileChange"
        component={ProfileChangeScreen}
        options={navigatorOptions('プロフィール編集')}
      />

      <MyPageStack.Screen 
        name="recordShow"
        component={RecordShowScreen}
        options={navigatorOptions("きろく")}
      />

      <MyPageStack.Screen 
        name="myPageSetting"
        component={MyPageSettingScreen}
        options={navigatorOptions('設定')}
      />

      <MyPageStack.Screen 
        name="myPagePrivacySetting"
        component={ProfileSettingPrivacyScreen}
        options={navigatorOptions('プライバシー設定')}
      />

      <MyPageStack.Screen 
        name="myPagePushSetting"
        component={SettingPushScreen}
        options={navigatorOptions('プッシュ通知')}
      />
      </>
    </StackNavigator>
  );
}

export default MyPageNavigator;
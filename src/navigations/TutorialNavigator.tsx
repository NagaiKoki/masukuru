import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TutorialUserNameScreen from '../screens/Tutorial/TutorialUserName';
import TutorialUserImageScreen from '../screens/Tutorial/TutorialUserImage';
import TutorialGroupMakeScreen from '../screens/Tutorial/TutorialGroupMake';
import HomeScreen from '../screens/Home';

const TutorialNavigator = () => {
  const TotorialStack = createStackNavigator();

  return (
    <TotorialStack.Navigator
      initialRouteName="名前を登録する"
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >

      <TotorialStack.Screen
        name="名前を登録する"
        component={TutorialUserNameScreen}
      />

      <TotorialStack.Screen
        name="プロフィール写真を登録する"
        component={TutorialUserImageScreen} 
        options={{
          headerBackTitleVisible: false
        }}
      />

      <TotorialStack.Screen
        name="グループを作成する"
        component={TutorialGroupMakeScreen}
        options={{
          headerBackTitleVisible: false
        }}
      />

      <TotorialStack.Screen 
        name="ホーム" 
        component={HomeScreen}
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
      />

    </TotorialStack.Navigator>
  )
}

export default TutorialNavigator;
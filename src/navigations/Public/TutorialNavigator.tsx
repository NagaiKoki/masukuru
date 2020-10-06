import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import TutorialUserNameScreen from '../../screens/Public/Tutorial/UserName';
import TutorialBodyInfoScreen from '../../screens/Public/Tutorial/BasicInfo';
import TutorialUserImageScreen from '../../screens/Public/Tutorial/UserImage';
import TutorialGroupMakeScreen from '../../screens/Public/Tutorial/SelectGroup';
import HomeScreen from '../../screens/Private/Home';
import { COLORS } from '../../constants/Styles';
// import container

const TutorialNavigator = () => {
  const TotorialStack = createStackNavigator();
  return (
    <TotorialStack.Navigator
      initialRouteName="TutorialUserName"
      screenOptions={{
        headerBackTitleVisible: false,
        gestureEnabled: false
      }}
    >
      <TotorialStack.Screen
        name="TutorialUserName"
        component={TutorialUserNameScreen}
        options={{
          gestureEnabled: false,
          headerTitle: '名前を登録する',
          headerTintColor: COLORS.BASE_MUSCLEW
        }}
      />

      <TotorialStack.Screen
        name="TutorialBodyInfo"
        component={TutorialBodyInfoScreen}
        options={{
          gestureEnabled: false,
          headerTitle: '基本情報を登録する',
          headerTintColor: COLORS.BASE_MUSCLEW
        }}
      />

      <TotorialStack.Screen
        name="TutorialUserImage"
        component={TutorialUserImageScreen} 
        options={{
          headerBackTitleVisible: false,
          headerTitle: "プロフィール写真を登録する",
          headerTintColor: COLORS.BASE_MUSCLEW
        }}
      />

      <TotorialStack.Screen
        name="TutorialGroupMake"
        component={TutorialGroupMakeScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "グループを作る",
          headerTintColor: COLORS.BASE_MUSCLEW
        }}
      />

      <TotorialStack.Screen 	
        name="home" 	
        component={HomeScreen}	
        options={{	
          headerShown: false,	
          gestureEnabled: false	
        }}	
      />
    </TotorialStack.Navigator>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center'
  }
})

export default TutorialNavigator;
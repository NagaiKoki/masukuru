import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MyPageScreen from '../screens/MyPage/MyPage'
import ProfileChangeScreen from '../screens/MyPage/ProfileChange';

const MyPageNavigator = () => { 
  const MyPageStack = createStackNavigator()

  return (
    <MyPageStack.Navigator
      initialRouteName='マイページ'
      screenOptions={{
        gestureEnabled: false
      }}
    >
       <MyPageStack.Screen
        name="マイページ"
        component={MyPageScreen}
      />

      <MyPageStack.Screen
        name="プロフィール編集"
        component={ProfileChangeScreen}
      />
    </MyPageStack.Navigator>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center'
  }
})

export default MyPageNavigator;
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import MyPageScreen from '../screens/MyPage/MyPage'
import ProfileChangeScreen from '../screens/MyPage/ProfileChange';

const MyPageNavigator = () => { 
  const MyPageStack = createStackNavigator()

  return (
    <MyPageStack.Navigator initialRouteName='マイページ'>
       <MyPageStack.Screen
        name="マイページ"
        component={MyPageScreen}
        options={{
          headerBackTitle: "header"
        }}
      />

      <MyPageStack.Screen
        name="プロフィール編集"
        component={ProfileChangeScreen}
        options={{
          headerBackTitleVisible: false
        }}
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
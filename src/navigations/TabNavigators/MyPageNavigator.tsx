import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
// import containers
import UserContainer from '../../containers/Private/users/myPage'
// import screens
import MyPageScreen from '../../screens/Private/MyPage/MyPage'
import ProfileChangeScreen from '../../screens/Private/MyPage/ProfileChange';
import { COLORS } from '../../constants/Styles'

const MyPageNavigator = () => { 
  const MyPageStack = createStackNavigator()
  
  return (
    <MyPageStack.Navigator initialRouteName='マイページ'>
       <MyPageStack.Screen
        name="マイページ"
        component={UserContainer}
        options={{
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
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
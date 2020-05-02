import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import MyPageScreen from '../screens/MyPage/MyPage'
import ProfileChangeScreen from '../screens/MyPage/ProfileChange';
import MenuScreen from '../screens/MyPage/Menus/index'
import { COLORS } from '../constants/Styles'

const MyPageNavigator = () => { 
  const MyPageStack = createStackNavigator()

  const getHeaderMenuTitle = (route) => {
    return route.params.item.name + 'の記録'
  }

  return (
    <MyPageStack.Navigator initialRouteName='マイページ'>
       <MyPageStack.Screen
        name="マイページ"
        component={MyPageScreen}
        options={{
          headerTintColor: COLORS.BASE_MUSCLEW
        }}
      />

      <MyPageStack.Screen
        name="プロフィール編集"
        component={ProfileChangeScreen}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: COLORS.BASE_MUSCLEW
        }}
      />

      <MyPageStack.Screen
        name="menu"
        component={MenuScreen}
        options={({route}) => ({
          headerBackTitleVisible: false,
          headerTitle: getHeaderMenuTitle(route),
          headerTintColor: COLORS.BASE_MUSCLEW
        })}
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
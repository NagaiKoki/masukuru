import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import firebase, { db } from '../../config/firebase'
import { COLORS } from '../../constants/Styles'
import Icon from 'react-native-vector-icons/FontAwesome';
// import screen
import HomeNavigator from './HomeNavigator'
import MenuScreen from '../../screens/MenuCategories/index'
import MyPageScreen from '../../screens/UserPage'
import GroupInfoScreen from '../../screens/Groups/GroupInfo'
import GroupEditScreen from '../../screens/Groups/GroupEdit'
import RecordModalNavigator from './Records/Modals/RecordModalNavigator'

const MainNavigator = () => { 
  const MainStack = createStackNavigator()
  
  // ヘッダータイトル関数
  const getHeaderMenuTitle = (route) => {
    return route.params.item.name + 'の記録'
  }

  const getHeaderUserTitle = (route) => {
    return route.params.user.name
  }

  return (
    <MainStack.Navigator initialRouteName="main">
      <MainStack.Screen 
        name="main" 
        component={HomeNavigator}
        options={{
          headerShown: false
        }}
      />

      <MainStack.Screen 
        name="recordModal"
        component={RecordModalNavigator}
        options={{
          headerShown: false,
        }}
      />

      <MainStack.Screen
        name="groupInfo"
        component={GroupInfoScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "グループ情報",
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        }}
      />

      <MainStack.Screen
        name="groupEdit"
        component={GroupEditScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "グループを編集する",
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        }}
      />

      <MainStack.Screen
        name="UserPage"
        component={MyPageScreen}
        options={({route}) => ({
          headerBackTitleVisible: false,
          headerTitle: getHeaderUserTitle(route),
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        })}
      />

      <MainStack.Screen
        name="menu"
        component={MenuScreen}
        options={({route}) => ({
          headerBackTitleVisible: false,
          headerTitle: getHeaderMenuTitle(route),
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        })}
      />

   </MainStack.Navigator>
  );
}

export default MainNavigator;
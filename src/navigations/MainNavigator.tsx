import React, { useState, useLayoutEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import firebase from '../config/firebase'
// import screen
import HomeScreen from '../screens/Home';
import TutorialNavigator from './TutorialNavigator';
import SignOutLoadingScreen from '../screens/SignOut/SignoutLoading';
import ProfileChangeScreen from '../screens/MyPage/ProfileChange';
import MenuScreen from '../screens/Menus/index'

const MainNavigator = () => { 
  const MainStack = createStackNavigator()
  const [initialNav, setInitialNav] = useState<string>('ホーム')
  const [loading, setloading] = useState(true)

  useLayoutEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user && user.displayName === null) {
        setInitialNav('Tutorial');
        setloading(false);
      } else {
        setloading(false);
      }
    })
  }, [])
  
  if (loading) {
    return (
      <ActivityIndicator size="large" style={[styles.loading]} />
    )
  }

  // ヘッダータイトル関数
  const getHeaderMenuTitle = (route) => {
    return route.params.item.name + 'の記録'
  }
 
  return (
    <MainStack.Navigator
      initialRouteName={initialNav}
    >
      <MainStack.Screen 
        name="Tutorial" 
        component={TutorialNavigator} 
        options={{
          headerShown: false
        }}
      />
  
      <MainStack.Screen 
        name="ホーム" 
        component={HomeScreen} 
        options={{
          gestureEnabled: false,
        }}
      />

      {/* TODO drawer禁止 */}
      <MainStack.Screen
        name="プロフィール編集"
        component={ProfileChangeScreen}
      />

      <MainStack.Screen
        name="menu"
        component={MenuScreen}
        options={({route}) => ({
          headerBackTitleVisible: false,
          headerTitle: getHeaderMenuTitle(route),
        })}
      />


    {/* ログアウト */}
    <MainStack.Screen name="SignoutLoading" component={SignOutLoadingScreen} />

    </MainStack.Navigator>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center'
  }
})

export default MainNavigator;
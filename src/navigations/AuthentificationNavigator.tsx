import React from 'react';
import { View } from 'react-native';
import { COLORS } from '../constants/Styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import SignupScreen from '../screens/SignUp';
import SignupHomeScreen from '../screens/SignUp/SignupHome';
import SignupLoadingScreen from '../screens/SignUp/SignupLoading';
import LoginScreen from '../screens/Login/Login';
import LoginLoadingScreen from '../screens/Login/LoginLoading';
import MyPageScreen from '../screens/MyPage/MyPage';

import firebase from 'firebase';

let InitialiNavName = ""

const AuthentificationNavigator = () => {
  const Stack = createStackNavigator();

  // firebase.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //     InitialiNavName = "Home";
  //   } else {
  //     InitialiNavName = "SignupHome";
  //   }
  // })

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Mypage"
        screenOptions={{
          headerBackTitleVisible: false
        }}
      >
        <Stack.Screen 
          name="MyPage" 
          component={MyPageScreen}  
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{
            title: "アカウントを登録する",
            headerTintColor: COLORS.BASE_MUSCLEW
          }}
        />
        <Stack.Screen 
          name="SignupHome" 
          component={SignupHomeScreen} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="SignupLoading" component={SignupLoadingScreen} />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            title: "ログイン",
            headerTintColor: COLORS.BASE_MUSCLEW,
          }}
        />
        <Stack.Screen name="LoginLoading" component={LoginLoadingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthentificationNavigator;

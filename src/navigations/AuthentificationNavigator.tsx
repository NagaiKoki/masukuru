import React from 'react';
import { View } from 'react-native';
import { COLORS } from '../constants/Styles';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import SignupScreen from '../screens/SignUp';
import SignupHomeScreen from '../screens/SignUp/SignupHome';
import SignupLoadingScreen from '../screens/SignUp/SignupLoading';
import LoginScreen from '../screens/Login/Login';
import LoginLoadingScreen from '../screens/Login/LoginLoading';
import firebase from 'firebase';

let InitialiNavName = ""

const AuthentificationNavigator = () => {
  const AuthenticateStack = createStackNavigator();

  return (    
  <AuthenticateStack.Navigator 
    initialRouteName="SignupHome"
    screenOptions={{
    headerBackTitleVisible: false
  }}
  >
    <AuthenticateStack.Screen 
      name="Home" 
      component={HomeScreen}  
    />
    <AuthenticateStack.Screen 
      name="Signup" 
      component={SignupScreen} 
      options={{
        title: "アカウントを登録する",
        headerTintColor: COLORS.BASE_MUSCLEW
      }}
    />
    <AuthenticateStack.Screen 
      name="SignupHome" 
      component={SignupHomeScreen} 
      options={{
        headerShown: false,
      }}
    />
    <AuthenticateStack.Screen name="SignupLoading" component={SignupLoadingScreen} />
    <AuthenticateStack.Screen 
      name="Login" 
      component={LoginScreen}
      options={{
        title: "ログイン",
        headerTintColor: COLORS.BASE_MUSCLEW,
      }}
    />

    <AuthenticateStack.Screen name="LoginLoading" component={LoginLoadingScreen} />
  </AuthenticateStack.Navigator>

  );
}

export default AuthentificationNavigator;

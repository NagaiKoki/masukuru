import React from 'react';
import { View } from 'react-native';
import { COLORS } from '../../constants/Styles';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/Private/Home';
import SignupScreen from '../../screens/Public/SignUp';
import SignupHomeScreen from '../../screens/Public/SignUp/SignupHome';
import LoginScreen from '../../screens/Public/Login/index';
import ResetPasswordScreen from '../../screens/Public/Login/ResetPassword';

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
      name="SignupHome" 
      component={SignupHomeScreen} 
      options={{
        headerShown: false,
      }}
    />

    {/* 登録 */}
    <AuthenticateStack.Screen 
      name="Signup" 
      component={SignupScreen} 
      options={{
        title: "アカウントを登録する",
        headerTintColor: COLORS.BASE_MUSCLEW
      }}
    />
    
    {/* ログイン */}
    <AuthenticateStack.Screen 
      name="Login" 
      component={LoginScreen}
      options={{
        title: "ログイン",
        headerTintColor: COLORS.BASE_MUSCLEW,
      }}
    />

    <AuthenticateStack.Screen 
      name="ResetPassword" 
      component={ResetPasswordScreen}
      options={{
        title: "パスワード再設定",
        headerTintColor: COLORS.BASE_MUSCLEW,
      }}
    />
  </AuthenticateStack.Navigator>

  );
}

export default AuthentificationNavigator;

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
import ResetPasswordScreen from '../screens/Login/ResetPassword';

const AuthentificationNavigator = ({ route }) => {
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
      initialParams={{ setIsChange: route.params.setIsChange }}
      options={{
        headerShown: false,
      }}
    />

    {/* 登録 */}
    <AuthenticateStack.Screen 
      name="Signup" 
      component={SignupScreen} 
      initialParams={{ setIsChange: route.params.setIsChange }}
      options={{
        title: "アカウントを登録する",
        headerTintColor: COLORS.BASE_MUSCLEW
      }}
    />
    <AuthenticateStack.Screen name="SignupLoading" component={SignupLoadingScreen} />

    {/* ログイン */}
    <AuthenticateStack.Screen 
      name="Login" 
      component={LoginScreen}
      initialParams={{ setIsChange: route.params.setIsChange }}
      options={{
        title: "ログイン",
        headerTintColor: COLORS.BASE_MUSCLEW,
      }}
    />

    <AuthenticateStack.Screen 
      name="ResetPassword" 
      component={ResetPasswordScreen}
      initialParams={{ setIsChange: route.params.setIsChange }}
      options={{
        title: "パスワード再設定",
        headerTintColor: COLORS.BASE_MUSCLEW,
      }}
    />


    <AuthenticateStack.Screen name="LoginLoading" component={LoginLoadingScreen} />

  </AuthenticateStack.Navigator>

  );
}

export default AuthentificationNavigator;

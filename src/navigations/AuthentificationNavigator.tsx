import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import SignupScreen from '../screens/SignUp';
import SignupHomeScreen from '../screens/SignUp/SignupHome';
import SignupLoadingScreen from '../screens/SignUp/SignupLoading';

const AuthentificationNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignupHome">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="SignupHome" component={SignupHomeScreen} />
        <Stack.Screen name="SignupLoading" component={SignupLoadingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthentificationNavigator;

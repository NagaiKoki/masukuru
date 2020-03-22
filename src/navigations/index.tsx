import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticationNavigator from './AuthentificationNavigator';
import MainTabNavigator from './MainTabNavigator';
import { ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

const Navigator = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const [isUser, setIsUser] = useState(false);

  const getUser = async () => {
    const loginUser = await AsyncStorage.getItem('loginUser');
    if (loginUser !== null) {
      setIsUser(true);
      setIsLoading(false);
    } else {
      setIsUser(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  if (isLoading) {
    return (
      <ActivityIndicator size='large' style={[styles.loading]} />
    )
  }

  const RootStack = createStackNavigator();
  const RootStackNavigator = () => (
    <RootStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false
      }}
    >
      { isUser ? (
        <RootStack.Screen 
          name="MainTabNavigator" 
          component={MainTabNavigator}
          options={{
            headerShown: false
          }}
        />
      ) : (
        <RootStack.Screen 
          name="AuthenticationNavigator" 
          component={AuthenticationNavigator}
          options={{
            headerShown: false
          }}
         /> 
      ) }
    </RootStack.Navigator>
  )
  
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center'
  }
})

export default Navigator;
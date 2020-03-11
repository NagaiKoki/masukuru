import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthentificationNavigator from './navigations';

const App = () => {
  return (
    <AuthentificationNavigator />
  );
}

export default App;

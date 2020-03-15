import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import types
import { RootTabParamList } from "./src/types";
// import component
import Home from './src/screens/Home';
import MyPage from './src/screens/MyPage';

const Tab = createBottomTabNavigator<RootTabParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Map'>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Mypage' component={MyPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App
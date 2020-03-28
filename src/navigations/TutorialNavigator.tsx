import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TutorialUserNameScreen from '../screens/Tutorial/TutorialUserName';
import TutorialUserImageScreen from '../screens/Tutorial/TutorialUserImage';
import TutorialGroupMakeScreen from '../screens/Tutorial/TutorialGroupMake';
import HomeScreen from '../screens/Home';

const TutorialNavigator = () => {
  const TotorialStack = createStackNavigator();

  return (
    <TotorialStack.Navigator
      initialRouteName="TutorialUserName"
      screenOptions={{
        headerBackTitleVisible: false
      }}
    >

      <TotorialStack.Screen
        name="TutorialUserName"
        component={TutorialUserNameScreen}
        options={{
          headerShown: false
        }}
      />

      <TotorialStack.Screen
        name="TutorialUserImage"
        component={TutorialUserImageScreen} 
      />

      <TotorialStack.Screen
        name="TutorialGroupMake"
        component={TutorialGroupMakeScreen}
      />

<TotorialStack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

    </TotorialStack.Navigator>
  )
}

export default TutorialNavigator;
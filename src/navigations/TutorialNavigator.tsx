import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TutorialUserNameScreen from '../screens/Tutorial/TutorialUserName';
import TutorialUserImageScreen from '../screens/Tutorial/TutorialUserImage';

const TutorialNavigator = () => {
  const TotorialStack = createStackNavigator();

  return (
    <TotorialStack.Navigator
      initialRouteName="TutorialUserImage"
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

    </TotorialStack.Navigator>
  )
}

export default TutorialNavigator;
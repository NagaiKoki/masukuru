import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TutorialBasicInfo from '../screens/Tutorial/TutorialBasicInfo';

const TutorialNavigator = () => {
  const TotorialStack = createStackNavigator();

  return (
    <TotorialStack.Navigator
      initialRouteName="TutorialBasicInfo"
      screenOptions={{
        headerBackTitleVisible: false
      }}
    >

      <TotorialStack.Screen
        name="TutorialBasicInfo"
        component={TutorialBasicInfo}
        options={{
          headerShown: false
        }}
      />

    </TotorialStack.Navigator>
  )
}

export default TutorialNavigator;
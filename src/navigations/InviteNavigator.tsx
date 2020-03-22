import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InviteFormScreen from '../screens/Invite/InvitedForm';

const InviteNavigator = () => {
  const InviteStack = createStackNavigator();

  return (
    <InviteStack.Navigator>
      <InviteStack.Screen
        name="InvitedForm"
        component={InviteFormScreen}
      />
    </InviteStack.Navigator>
  )
}

export default InviteNavigator;
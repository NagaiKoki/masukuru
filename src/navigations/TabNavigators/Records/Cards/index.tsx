import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
// import screens
import RecordScreen from '../../../../screens/Records/'
// import constants
import { COLORS } from '../../../../constants/Styles'


const RecordCardsNavigator = () => {
  const CardStack = createStackNavigator();
  return (
    <CardStack.Navigator initialRouteName="record">
      <CardStack.Screen 
        name="record"
        component={RecordScreen}
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
          headerTitle: 'じぶんのきろく',
          headerTintColor: COLORS.BASE_MUSCLEW
        }}
      />
    </CardStack.Navigator>
  )
}

export default RecordCardsNavigator;
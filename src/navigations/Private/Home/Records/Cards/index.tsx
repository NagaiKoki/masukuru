import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
// import constants
import { COLORS } from '../../../../../constants/Styles'
// import containers
import RecordContainer from '../../../../../containers/Private/records/record'


const RecordCardsNavigator = () => {
  const CardStack = createStackNavigator();
  return (
    <CardStack.Navigator initialRouteName="record">
      <CardStack.Screen 
        name="record"
        component={RecordContainer}
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
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../../../constants/Styles'
// import navigators
import RecordCardsNavigator from './Cards'
import RecordModalNavigator from './Modals/RecordModalNavigator'

const RecordNavigator = () => {
  const RecordStack = createStackNavigator();
  
  return (
    <RecordStack.Navigator initialRouteName='きろく' mode="modal">

      <RecordStack.Screen
        name="record"
        component={RecordCardsNavigator}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'じぶんのきろく',
          headerTintColor: COLORS.BASE_MUSCLEW
        }}
      />

      <RecordStack.Screen 
        name="recordModal"
        component={RecordModalNavigator}
        options={{
          headerShown: false
        }}
      />
    </RecordStack.Navigator>
  )
}

export default RecordNavigator
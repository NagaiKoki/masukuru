import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../../../constants/Styles'
// import navigators
import RecordCardsNavigator from '../Home/Records/Cards'

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
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        }}
      />
    </RecordStack.Navigator>
    
  )
}

export default RecordNavigator
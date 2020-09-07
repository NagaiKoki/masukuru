import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../../../constants/Styles'
// import screens
import ChartScreen from '../../../screens/Private/Charts'

const ChartNavigator = () => {
  const RecordStack = createStackNavigator();

  return (
    <RecordStack.Navigator initialRouteName='きろく' mode="modal">
      <RecordStack.Screen
        name="chart"
        component={ChartScreen}
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

export default ChartNavigator
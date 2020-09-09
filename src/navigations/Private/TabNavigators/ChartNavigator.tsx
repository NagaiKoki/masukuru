import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../../../constants/Styles'
// import screens
import WeightChartScreen from '../../../screens/Private/Charts/Weight'
import FatChartScreen from '../../../screens/Private/Charts/FatPercentage'

const ChartNavigator = () => {
  const RecordStack = createStackNavigator();

  return (
    <RecordStack.Navigator initialRouteName='きろく' mode="modal">
      <RecordStack.Screen
        name="weightChart"
        component={WeightChartScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'グラフ',
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        }}
      />

      <RecordStack.Screen
        name="fatChart"
        component={FatChartScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'グラフ',
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
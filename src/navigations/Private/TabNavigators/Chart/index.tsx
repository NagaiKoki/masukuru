import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../../../../constants/Styles'
// import navigator
import ChartGraphNavigator from './ChartNavigator'
// import screens
import ChartSettingScreen from '../../../../screens/Private/Charts/Setting'
import GoalSettingScreen from '../../../../screens/Private/Charts/Setting/GoalSetting'

const ChartNavigator = () => {
  const ChartStack = createStackNavigator();

  return (
    <ChartStack.Navigator initialRouteName='chartGraph'>
      <ChartStack.Screen 
        name="chartGraph"
        component={ChartGraphNavigator}
        options={{
          headerShown: false
        }}
      />

      <ChartStack.Screen 
        name="chartSetting"
        component={ChartSettingScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'グラフの設定',
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        }}
      />

      <ChartStack.Screen 
        name="goalSetting"
        component={GoalSettingScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: '目標値の設定',
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        }}
      />
    </ChartStack.Navigator>
  )
}

export default ChartNavigator
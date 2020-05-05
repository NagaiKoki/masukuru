import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import RecordScreen from '../../screens/Records'
import { COLORS } from '../../constants/Styles'

const RecordNavigator = () => {
  const RecordStack = createStackNavigator();

  return (
    <RecordStack.Navigator initialRouteName='きろく'>
      <RecordStack.Screen
        name="record"
        component={RecordScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'きろく',
          headerTintColor: COLORS.BASE_MUSCLEW
        }}
      />
    </RecordStack.Navigator>
  )
}

export default RecordNavigator
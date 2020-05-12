import React from 'react'
import RecordModalScreen from '../../../screens/Records/Modals'
import { createStackNavigator } from '@react-navigation/stack'

const RecordModalNavigator = () => {
  const RecordModalStack = createStackNavigator()

  return (
    <RecordModalStack.Navigator mode="modal">
      <RecordModalStack.Screen 
        name="recordModal"
        component={RecordModalScreen}
        options={{
          headerShown: false
        }}
      />
    </RecordModalStack.Navigator>
  )
}

export default RecordModalNavigator
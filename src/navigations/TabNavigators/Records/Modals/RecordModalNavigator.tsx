import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// import screens
import RecordModalScreen from '../../../../screens/Records/Modals'
import AddRecordScreen from '../../../../screens/Records/Modals/addRecord'

const RecordModalNavigator = () => {
  const RecordModalStack = createStackNavigator()

  return (
    <RecordModalStack.Navigator>
      <RecordModalStack.Screen 
        name="recordModal"
        component={RecordModalScreen}
        options={{
          headerTitle: 'fsfs',
          headerBackTitle: 'ddfdsf',
          headerTintColor: 'red',
          headerShown: false
        }}
      />

      <RecordModalStack.Screen 
        name="addRecordModal"
        component={AddRecordScreen}
        options={{
          headerShown: false
        }}
      />
    </RecordModalStack.Navigator>
  )
}

export default RecordModalNavigator
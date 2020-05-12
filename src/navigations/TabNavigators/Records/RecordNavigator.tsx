import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from '../../../screens/Records/Menus'
import RecordScreen from '../../../screens/Records'
import AddRecordScreen from '../../../screens/Records/Modals/addRecord'
import RecordModalNavigator from './RecordModalNavigator'
import { COLORS } from '../../../constants/Styles'

const RecordNavigator = () => {
  const RecordStack = createStackNavigator();

  const getHeaderMenuTitle = (route) => {
    return route.params.item.name + 'の記録'
  }

  return (
    <RecordStack.Navigator initialRouteName='きろく'>
      <RecordStack.Screen
        name="record"
        component={RecordScreen}
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

      <RecordStack.Screen 
        name="addRecordModal"
        component={AddRecordScreen}
        options={{
          headerShown: false
        }}
      />

      <RecordStack.Screen
        name="menu"
        component={MenuScreen}
        options={({route}) => ({
          headerBackTitleVisible: false,
          headerTitle: getHeaderMenuTitle(route),
          headerTintColor: COLORS.BASE_MUSCLEW
        })}
      />
    </RecordStack.Navigator>
  )
}

export default RecordNavigator
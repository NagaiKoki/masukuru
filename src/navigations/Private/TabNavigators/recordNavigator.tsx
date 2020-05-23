import React from 'react';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components'
import { COLORS } from '../../../constants/Styles'
// import navigators
import RecordCardsNavigator from '../Home/Records/Cards'
import RecordModalNavigator from '../Home/Records/Modals/RecordModalNavigator'

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

      {/* <RecordStack.Screen 
        name="recordModal"
        component={RecordModalNavigator}
        options={{
          headerShown: false,
        }}
      /> */}
    </RecordStack.Navigator>
    
  )
}

export default RecordNavigator
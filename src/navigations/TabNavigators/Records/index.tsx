import React from 'react';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components'
import { COLORS } from '../../../constants/Styles'
// import navigators
import RecordCardsNavigator from './Cards'
import RecordModalNavigator from './Modals/RecordModalNavigator'

const RecordNavigator = () => {
  const RecordStack = createStackNavigator();
  const navigation = useNavigation()
  
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
          headerLeft: () => {
            return (
              <HeaderBackBtn onPress={ () => navigation.navigate('record') }>
                <HeaderBackTitle>キャンセル</HeaderBackTitle>
              </HeaderBackBtn>
            )
          },
          headerTitle: '記録をのこす',
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE
        }}
      />
    </RecordStack.Navigator>
  )
}

export default RecordNavigator

const HeaderBackBtn = styled.TouchableOpacity`

`

const HeaderBackTitle = styled.Text`
  color: ${COLORS.BASE_WHITE};
  margin-left: 10px;
`
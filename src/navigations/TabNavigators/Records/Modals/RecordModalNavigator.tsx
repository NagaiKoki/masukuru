import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components'
import { COLORS } from '../../../../constants/Styles'
// import containers
import RecordContainer from '../../../../containers/record'
import AddRecordContainer from '../../../../containers/addRecord'
import AddRecordWordContainer from '../../../../containers/addRecordWord'

const RecordModalNavigator = () => {
  const RecordModalStack = createStackNavigator()
  const navigation = useNavigation()

  return (
    <RecordModalStack.Navigator>
      <RecordModalStack.Screen 
        name="recordModal"
        component={RecordContainer}
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

      <RecordModalStack.Screen 
        name="addRecordModal"
        component={AddRecordContainer}
      />

      <RecordModalStack.Screen 
        name="addRecordWordModal"
        component={AddRecordWordContainer}
      />
    </RecordModalStack.Navigator>
  )
}

const HeaderBackBtn = styled.TouchableOpacity`
`

const HeaderBackTitle = styled.Text`
  margin-left: 10px;
  font-size: 16px;
  color: ${COLORS.BASE_WHITE};
`

export default RecordModalNavigator
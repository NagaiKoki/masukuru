import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components'
import { COLORS } from '../../../../constants/Styles'
// import store
import store from '../../../../reducers'
// import action
import { initializeRecords } from '../../../../actions/records'
// import containers
import RecordContainer from '../../../../containers/records/recordModal'
import AddRecordContainer from '../../../../containers/records/addRecord'
import AddRecordWordContainer from '../../../../containers/records/addRecordWord'

const RecordModalNavigator = () => {
  const RecordModalStack = createStackNavigator()
  const navigation = useNavigation()

  const handleCancelRecord = () => {
    store.dispatch(initializeRecords())
    navigation.navigate('mainContainer')
  }

  return (
    <RecordModalStack.Navigator>
      <RecordModalStack.Screen 
        name="recordModal"
        component={RecordContainer}
        options={{
          headerLeft: () => {
            return (
              <HeaderBackBtn onPress={handleCancelRecord}>
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
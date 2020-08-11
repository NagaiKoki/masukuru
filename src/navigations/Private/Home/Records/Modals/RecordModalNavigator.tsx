import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components'
import { COLORS } from '../../../../../constants/Styles'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import containers
import RecordContainer from '../../../../../containers/Private/records/recordModal'
import AddRecordContainer from '../../../../../containers/Private/records/addRecord'
import AddRecordWordContainer from '../../../../../containers/Private/records/addRecordWord'

const RecordModalNavigator = () => {
  const RecordModalStack = createStackNavigator()
  const navigation = useNavigation()

  const handleCancelRecord = () => {
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
              <EvilIcons name="close" 
                size={24} 
                onPress={handleCancelRecord}
                style={{ paddingLeft: 20, color: COLORS.BASE_WHITE }}
              />
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
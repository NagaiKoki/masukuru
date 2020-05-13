import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components'
import { COLORS } from '../../../../constants/Styles'
// import screens
import RecordModalScreen from '../../../../screens/Records/Modals'
import AddRecordScreen from '../../../../screens/Records/Modals/addRecord'

const RecordModalNavigator = () => {
  const RecordModalStack = createStackNavigator()
  const navigation = useNavigation()

  return (
    <RecordModalStack.Navigator>
      <RecordModalStack.Screen 
        name="recordModal"
        component={RecordModalScreen}
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
        component={AddRecordScreen}
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
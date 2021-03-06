import React from 'react'
import { useDispatch } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../../../../constants/Styles'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import screens
import RecordFormScreen from '../../../../../screens/Private/Records/Modals/Form/TrainingForm'
import RecordTweetScreen from '../../../../../screens/Private/Records/Modals/Form/TweetForm'
import RecordEditScreen from '../../../../../screens/Private/Records/Modals/edit'
import RecordHistoryScreen from '../../../../../screens/Private/Records/Modals/RecordHistory'
// import slice
import { initializeTemporaryRecord } from '../../../../../slice/record'

const RecordModalNavigator = ({ route }) => {
  const RecordModalStack = createStackNavigator()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleCancelRecord = () => {
    dispatch(initializeTemporaryRecord())
    navigation.navigate('mainContainer')
  }

  return (
    <RecordModalStack.Navigator>
      <RecordModalStack.Screen 
        name="recordEditModal"
        component={RecordEditScreen}
        initialParams={{ recordId: route.params.recordId }}
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
        name="trainingRecordModal"
        component={RecordFormScreen}
      />

      <RecordModalStack.Screen 
        name="tweetRecordModal"
        component={RecordTweetScreen}
      />

      <RecordModalStack.Screen 
        name="recordHistory"
        component={RecordHistoryScreen}
      />
    </RecordModalStack.Navigator>
  )
}

export default RecordModalNavigator
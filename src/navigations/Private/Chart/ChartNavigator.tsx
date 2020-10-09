import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../../constants/Styles'
// import screens
import WeightChartScreen from '../../../screens/Private/Charts'
import AddWeightScreen from '../../../screens/Private/Charts/AddWeight'

const ChartNavigator = ({ navigation }) => {
  const RecordStack = createStackNavigator();

  return (
    <RecordStack.Navigator initialRouteName='きろく' mode="modal">
      <RecordStack.Screen
        name="weightChart"
        component={WeightChartScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'グラフ',
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
          headerLeft: () => (
            <Icon name="bars" 
                  size={24} 
                  onPress={() => { navigation.openDrawer() }} 
                  style={{ paddingLeft: 20, color: COLORS.BASE_WHITE }}
            />
          ),
        }}
      />

      <RecordStack.Screen
        name="addWeight"
        component={AddWeightScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: '体重を記録する',
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW,
          },
          headerTintColor: COLORS.BASE_WHITE,
        }}
      />
    </RecordStack.Navigator>
    
  )
}

export default ChartNavigator
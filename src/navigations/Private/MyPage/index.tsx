import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
// import containers
import UserContainer from '../../../containers/Private/users/myPage'
// import screens
import ProfileChangeScreen from '../../../screens/Private/MyPage/ProfileChange';
import RecordShowScreen from '../../../screens/Private/Records/Show'
import { COLORS } from '../../../constants/Styles'

const MyPageNavigator = ({ navigation }) => { 
  const MyPageStack = createStackNavigator()
  
  return (
    <MyPageStack.Navigator initialRouteName='MyPage'>
       <MyPageStack.Screen
        name="MyPage"
        component={UserContainer}
        options={{
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
          gestureEnabled: false,
        }}
      />
      

      <MyPageStack.Screen
        name="プロフィール編集"
        component={ProfileChangeScreen}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        }}
      />

      <MyPageStack.Screen 
        name="recordShow"
        component={RecordShowScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "きろく",
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        }}
      />
    </MyPageStack.Navigator>
  );
}

export default MyPageNavigator;
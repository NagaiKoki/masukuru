import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import containers
import UserContainer from '../../../containers/Private/users/myPage'
import RecordShowContainer from '../../../containers/Private/records/recordShow'
// import screens
import ProfileChangeScreen from '../../../screens/Private/MyPage/ProfileChange';
import { COLORS } from '../../../constants/Styles'

const MyPageNavigator = () => { 
  const MyPageStack = createStackNavigator()
  
  return (
    <MyPageStack.Navigator initialRouteName='マイページ'>
       <MyPageStack.Screen
        name="マイページ"
        component={UserContainer}
        options={{
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
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
        component={RecordShowContainer}
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
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../../../constants/Styles'
// import components
import Loading from '../../../components/Loading'
// import screen
import GroupScreen from '../../../screens/Private/Groups'
import GroupEditScreen from '../../../screens/Private/Groups/Edit'
import SettingScreen from '../../../screens/Private/Setting'
import SettingPushScreen from '../../../screens/Private/Setting/Push'
// import navigator
import RecordModalNavigator from './Records/Modals/RecordModalNavigator'
import HomeNavigator from './Timeline'
// import container
import UserPageContainer from '../../../containers/Private/users/userPage'
import RecordShowScreen from '../../../screens/Private/Records/Show'
// import selectors
import { useGroupSelector } from '../../../selectors/group'

const MainNavigator = () => { 
  const MainStack = createStackNavigator()
  const { currentGroupId, setCurrentGroupId } = useGroupSelector()
  
  useEffect(() => {
    setCurrentGroupId()
  }, [])

  if (!currentGroupId) {
    return <Loading size="small" />
  }
  
  const getHeaderUserTitle = (route) => {
    return route.params.user.name
  }

  return (
    <MainStack.Navigator initialRouteName="main">
      <MainStack.Screen 
        name="main" 
        component={HomeNavigator}
        options={{
          headerShown: false
        }}
      />

      <MainStack.Screen 
        name="recordModal"
        component={RecordModalNavigator}
        options={{
          headerShown: false,
        }}
      />

      <MainStack.Screen
        name="groupInfo"
        component={GroupScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "グループ情報",
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        }}
      />

      <MainStack.Screen
        name="groupEdit"
        component={GroupEditScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "グループを編集する",
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        }}
      />

      <MainStack.Screen 
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

      <MainStack.Screen
        name="UserPage"
        component={UserPageContainer}
        options={({route}) => ({
          headerBackTitleVisible: false,
          headerTitle: getHeaderUserTitle(route),
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        })}
      />

      <MainStack.Screen
        name="setting"
        component={SettingScreen}
        options={({}) => ({
          headerBackTitleVisible: false,
          headerTitle: '設定',
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        })}
      />

      <MainStack.Screen
        name="settingPush"
        component={SettingPushScreen}
        options={() => ({
          headerBackTitleVisible: false,
          headerTitle: '通知',
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
          headerTintColor: COLORS.BASE_WHITE,
        })}
      />
   </MainStack.Navigator>
  );
}

export default MainNavigator;
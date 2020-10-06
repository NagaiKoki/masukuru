import React, { useState, useCallback } from 'react';
import styled from 'styled-components'
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase, { db } from '../../../config/firebase'
import { COLORS } from '../../../constants/Styles'
// import components
import Loading from '../../../components/Loading'
// import screen
import GroupInfoScreen from '../../../screens/Private/Groups/GroupInfo'
import GroupEditScreen from '../../../screens/Private/Groups/GroupEdit'
import SettingScreen from '../../../screens/Private/Setting'
import SettingPushScreen from '../../../screens/Private/Setting/Push'
// import navigator
import RecordModalNavigator from './Records/Modals/RecordModalNavigator'
import HomeNavigator from './Timeline'
// import container
import UserPageContainer from '../../../containers/Private/users/userPage'
import RecordShowScreen from '../../../screens/Private/Records/Show'

const MainNavigator = () => { 
  const MainStack = createStackNavigator()
  const [currentGroupId, setCurrentGroupId] = useState('');
  const [loading, setloading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      firebase.auth().onAuthStateChanged( async user => {
        if (user) {
          await db.collectionGroup("groupUsers").where('uid', '==', user.uid).get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(doc => {
              // TODO: currentGroupIdをcurrentGroupドキュメントに含めるにあたり、カラムない場合は所属するグループが一つしかないようにする
              if (doc.data().currentGroupId) {
                setCurrentGroupId(doc.data().currentGroupId);
              } else {
                setCurrentGroupId(doc.ref.parent.parent.id);
              }
            });
          })
          setloading(false);
        }
      })
    }, [])
  )

  if (loading || currentGroupId === "") {
    return (
      <LoadingContainer>
        <Loading size="small" />
      </LoadingContainer>
    )
  }
  
  const getHeaderUserTitle = (route) => {
    return route.params.user.name
  }

  return (
    <MainStack.Navigator initialRouteName="main">
      <MainStack.Screen 
        name="main" 
        component={HomeNavigator}
        initialParams={{ currentGroupId: currentGroupId }}
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
        component={GroupInfoScreen}
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
        options={({}) => ({
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

const LoadingContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

export default MainNavigator;
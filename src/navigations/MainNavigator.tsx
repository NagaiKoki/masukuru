import React, { useState, useLayoutEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import firebase, { db } from '../config/firebase'
import { COLORS } from '../constants/Styles'
import Icon from 'react-native-vector-icons/FontAwesome';
// import screen
import HomeScreen from '../screens/Home'
import MenuScreen from '../screens/Menus/index'
import MyPageScreen from '../screens/UserPage'
import GroupInfoScreen from '../screens/Groups/GroupInfo'
import GroupEditScreen from '../screens/Groups/GroupEdit'

const MainNavigator = ({ navigation }) => { 
  const MainStack = createStackNavigator()
  const [initialNav, setInitialNav] = useState<string>('main')
  const [currentGroupId, setCurrentGroupId] = useState('');
  const [loading, setloading] = useState(true)

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collectionGroup("groupUsers").where('uid', '==', user.uid).get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(doc => {
            // TODO: currentGroupIdをcurrentGroupドキュメントに含めるにあたり、カラムない場合は所属するグループが一つしかないようにする
            if (doc.data().currentGroupId) {
              return setCurrentGroupId(doc.data().currentGroupId);
            } else {
              setCurrentGroupId(doc.ref.parent.parent.id);
            }
          });
        })
        setloading(false);
      }
    })
  }, [])

  if (loading || currentGroupId === "") {
    return (
      <ActivityIndicator size="large" style={[styles.loading]} />
    )
  }

  // ヘッダータイトル関数
  const getHeaderMenuTitle = (route) => {
    return route.params.item.name + 'の記録'
  }

  const getHeaderUserTitle = (route) => {
    return route.params.user.name
  }

  return (
    <MainStack.Navigator initialRouteName={initialNav}>
    
      <MainStack.Screen 
        name="main" 
        component={HomeScreen}
        initialParams={{ currentGroupId: currentGroupId }}
        options={{
          headerLeft: () => (
            <Icon name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20, color: COLORS.SUB_BLACK }}
            />
          ),
          gestureEnabled: false,
          headerTintColor: COLORS.BASE_MUSCLEW,
          headerTitle: 'ホーム'
        }}
      />

      <MainStack.Screen
        name="groupInfo"
        component={GroupInfoScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "このグループについて",
          headerTintColor: COLORS.BASE_MUSCLEW
        }}
      />

      <MainStack.Screen
        name="groupEdit"
        component={GroupEditScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "グループを編集する",
          headerTintColor: COLORS.BASE_MUSCLEW
        }}
      />

      <MainStack.Screen
        name="menu"
        component={MenuScreen}
        initialParams={{ currentGroupId: currentGroupId }}
        options={({route}) => ({
          headerBackTitleVisible: false,
          headerTitle: getHeaderMenuTitle(route),
          headerTintColor: COLORS.BASE_MUSCLEW
        })}
      />

      <MainStack.Screen
        name="UserPage"
        component={MyPageScreen}
        options={({route}) => ({
          headerBackTitleVisible: false,
          headerTitle: getHeaderUserTitle(route),
          headerTintColor: COLORS.BASE_MUSCLEW
        })}
      />

   </MainStack.Navigator>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center'
  }
})

export default MainNavigator;
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
  const [currentGroupName, setCurrentGroupName] = useState('ホーム')
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

  const getHeaderGroupName = () => {
    let groupName;
    const getName = async () => {
      await db.collection('groups').doc(currentGroupId).get().then(snap => {
        if (snap.data().groupName) {
          groupName = snap.data().groupName
        } 
      })
    }
    getName()
  }

  return (
    <MainStack.Navigator initialRouteName={initialNav}>
    
      <MainStack.Screen 
        name="main" 
        component={HomeScreen}
        initialParams={{ currentGroupId: currentGroupId, currentGroupName: currentGroupName }}
        options={({route}) => ({
          headerLeft: () => (
            <Icon name="bars" 
                  size={24} 
                  onPress={() => { navigation.openDrawer() }} 
                  style={{ paddingLeft: 20, color: COLORS.SUB_BLACK }}
            />
          ),
          gestureEnabled: false,
          headerTintColor: COLORS.BASE_MUSCLEW,
          
        })}
      />

      <MainStack.Screen
        name="groupInfo"
        component={GroupInfoScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "グループ情報",
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
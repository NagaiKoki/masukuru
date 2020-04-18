import React, { useState, useLayoutEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import firebase, { db } from '../config/firebase'
import { COLORS } from '../constants/Styles'
// import screen
import HomeScreen from '../screens/Home';
import MenuScreen from '../screens/Menus/index'
import MyPageScreen from '../screens/UserPage'
import Icon from 'react-native-vector-icons/FontAwesome';

const MainNavigator = ({ navigation }) => { 
  const MainStack = createStackNavigator()
  const [initialNav, setInitialNav] = useState<string>('ホーム')
  const [currentGroupId, setCurrentGroupId] = useState('');
  const [loading, setloading] = useState(true)

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collectionGroup("groupUsers").where('uid', '==', user.uid).limit(1).get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(doc => {
            setCurrentGroupId(doc.ref.parent.parent.id);
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
        name="ホーム" 
        component={HomeScreen}
        initialParams={{ currentGroupId: currentGroupId }}
        options={{
          headerLeft: () => (
            <Icon name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20 }}
            />
          ),
          gestureEnabled: false,
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
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase, { db } from '../../config/firebase'
import { COLORS } from '../../constants/Styles'
import Icon from 'react-native-vector-icons/FontAwesome';
// import screen
import RecordModalNavigator from './Records/Modals/RecordModalNavigator'
// import containers
import HomeContainer from '../../containers/home'

const HomeNavigator = ({ navigation }) => { 
  const HomeStack = createStackNavigator()
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
      <ActivityIndicator size="large" style={[styles.loading]} />
    )
  }

  return (
    <HomeStack.Navigator initialRouteName="main" mode="modal">
      <HomeStack.Screen 
        name="main" 
        component={HomeContainer}
        initialParams={{ currentGroupId: currentGroupId }}
        options={({route}) => ({
          headerLeft: () => (
            <Icon name="bars" 
                  size={24} 
                  onPress={() => { navigation.openDrawer() }} 
                  style={{ paddingLeft: 20, color: COLORS.BASE_WHITE }}
            />
          ),
          gestureEnabled: false,
          headerTintColor: COLORS.BASE_WHITE,
          headerStyle: {
            backgroundColor: COLORS.BASE_MUSCLEW
          },
        })}
      />

      <HomeStack.Screen 
        name="recordModal"
        component={RecordModalNavigator}
        options={{
          headerShown: false,
        }}
      />
   </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center'
  }
})

export default HomeNavigator;
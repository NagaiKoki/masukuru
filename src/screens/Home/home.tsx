import React from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

const HomeScreen = ({ navigation }) => {
  const handleSignOut = () => {
      firebase.auth().onAuthStateChanged((user) => {
        firebase.auth().signOut().then(() => {
          navigation.navigate('SignupHome');
        }).catch((error) => { console.log('ログアウトしました') })
      })
    }
    return (
      <View>
        <TouchableOpacity onPress={ () => handleSignOut() }>
          <Text>ログアウト</Text>
        </TouchableOpacity>
      </View>
    )
}

export default HomeScreen;
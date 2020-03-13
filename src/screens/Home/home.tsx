import React from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import styled from 'styled-components';

const HomeScreen = ({ navigation }) => {
  const handleSignOut = () => {
      firebase.auth().onAuthStateChanged((user) => {
        firebase.auth().signOut().then(() => {
          navigation.navigate('SignupHome');
        }).catch((error) => { console.log('ログアウトしました') })
      })
    }
    return (
      <HomeContainer>
        <TouchableOpacity onPress={ () => handleSignOut() }>
          <Text>ログアウト</Text>
        </TouchableOpacity>
      </HomeContainer>
    )
}

const HomeContainer = styled.View`
  flex: 1;
  padding-top: 50px;
`

export default HomeScreen;
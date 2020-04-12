import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import TutorialUserNameScreen from '../screens/Tutorial/TutorialUserName';
import TutorialUserImageScreen from '../screens/Tutorial/TutorialUserImage';
import TutorialGroupMakeScreen from '../screens/Tutorial/TutorialGroupMake';
import HomeScreen from '../screens/Home';

const TutorialNavigator = ({ route }) => {
  const TotorialStack = createStackNavigator();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, []) 

  if (isLoading) {
    return (
      <ActivityIndicator size="large" style={[styles.loading]} />
    )
  }

  return (
    <TotorialStack.Navigator
      initialRouteName="名前を登録する"
      screenOptions={{
        headerBackTitleVisible: false,
        gestureEnabled: false
      }}
    >

      <TotorialStack.Screen
        name="名前を登録する"
        component={TutorialUserNameScreen}
        options={{
          gestureEnabled: false
        }}
      />

      <TotorialStack.Screen
        name="プロフィール写真を登録する"
        component={TutorialUserImageScreen} 
        options={{
          headerBackTitleVisible: false
        }}
      />

      <TotorialStack.Screen
        name="グループを作成する"
        component={TutorialGroupMakeScreen}
        initialParams={{ setIsChange: route.params.setIsChange }}
        options={{
          headerBackTitleVisible: false
        }}
      />

      <TotorialStack.Screen 	
        name="home" 	
        component={HomeScreen}	
        options={{	
          headerShown: false,	
          gestureEnabled: false	
        }}	
      />

    </TotorialStack.Navigator>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center'
  }
})

export default TutorialNavigator;
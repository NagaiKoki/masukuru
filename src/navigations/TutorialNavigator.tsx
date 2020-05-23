import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native'
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import TutorialUserNameScreen from '../screens/Tutorial/TutorialUserName';
import TutorialBodyInfoScreen from '../screens/Tutorial/TutorialBodyInfo';
import TutorialUserImageScreen from '../screens/Tutorial/TutorialUserImage';
import TutorialGroupMakeScreen from '../screens/Tutorial/TutorialGroupMake';
import TutorialUsageScreen from '../screens/Tutorial/TutorialUsage';
import HomeScreen from '../screens/Home';
import { COLORS } from '../constants/Styles';
// import container

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
      initialRouteName="TutorialUserName"
      screenOptions={{
        headerBackTitleVisible: false,
        gestureEnabled: false
      }}
    >

      <TotorialStack.Screen
        name="TutorialUserName"
        component={TutorialUserNameScreen}
        options={{
          gestureEnabled: false,
          headerTitle: '名前を登録する',
          headerTintColor: COLORS.BASE_MUSCLEW
        }}
      />

      <TotorialStack.Screen
        name="TutorialBodyInfo"
        component={TutorialBodyInfoScreen}
        options={{
          gestureEnabled: false,
          headerTitle: '基本情報を登録する',
          headerTintColor: COLORS.BASE_MUSCLEW
        }}
      />

      <TotorialStack.Screen
        name="TutorialUserImage"
        component={TutorialUserImageScreen} 
        options={{
          headerBackTitleVisible: false,
          headerTitle: "プロフィール写真を登録する",
          headerTintColor: COLORS.BASE_MUSCLEW
        }}
      />

      <TotorialStack.Screen
        name="TutorialGroupMake"
        component={TutorialGroupMakeScreen}
        initialParams={{ setIsChange: route.params.setIsChange }}
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
          headerTitle: "グループを作る",
          headerTintColor: COLORS.BASE_MUSCLEW
        }}
      />

      <TotorialStack.Screen
        name="TutorialUsage"
        component={TutorialUsageScreen}
        initialParams={{ setIsChange: route.params.setIsChange }}
        options={{
          headerBackTitleVisible: false,
          gestureEnabled: false,
          headerShown: false,
          headerTitle: "マスクルの使い方",
          headerTintColor: COLORS.BASE_MUSCLEW
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
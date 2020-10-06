import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components';
// import selectors
import { useAuthSelectors } from '../selectors/auth'
// import utils
import { useUserStatus } from '../utilities/hooks/useUserStatus'
// import navigators
import AuthorizedNavigator from './Private';
import TutorialNavigator from './Public/Tutorial'
import AuthenticationNavigator from './Public/Unauthorized';
// import screens
import DrawerContent from '../screens/Private/Drawers/DrawerContents';
// import components
import Loading from '../components/Loading'
// import confing
import firebase from '../config/firebase'
// import constants
import { COLORS } from '../constants/Styles';

const RootNavigator = () => {
  const { userStatus, setUserStatus } = useAuthSelectors()
  const [isMouted, setIsMouted] = useState(false)
  const status = useUserStatus()
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  useEffect(() => {
    setUserStatus(status)
    setIsMouted(true)
  }, [status])

  if (!isMouted || !status) {
    return (
      <LoadingContainer>
        <Loading size="small" />
      </LoadingContainer>
    )
  }

  const renderNavigator = () => {
    switch (userStatus) {
      case 'unauthorized': {
        return (
          <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
            <Stack.Screen
              name='AuthenticationNavigator'
              component={AuthenticationNavigator}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator>
        )
      }
      case 'tutorial': {
        return (
          <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
            <Stack.Screen 
              name="Tutorial"
              component={TutorialNavigator}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator>
        )
      }
      case 'authorized': {
        return (
          <Drawer.Navigator 
            drawerStyle={{ width: 330 }} 
            drawerContent={ (props) => <DrawerContent user={firebase.auth().currentUser} {...props}/>}
          >
            <Drawer.Screen 
              name="MainTabNavigator"
              component={AuthorizedNavigator}
            />
          </Drawer.Navigator>
        )
      }
    }
  }

  return (
    <NavigationContainer>
      {renderNavigator()}
    </NavigationContainer>
  )
}

const LoadingContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`

export default RootNavigator
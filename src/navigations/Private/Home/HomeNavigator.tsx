import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../../../constants/Styles'
import Icon from 'react-native-vector-icons/FontAwesome';
// import screen
import RecordModalNavigator from './Records/Modals/RecordModalNavigator'
// import containers
import HomeContainer from '../../../containers/Private/home'

const HomeNavigator = ({ navigation, route }) => { 
  const HomeStack = createStackNavigator()
  const { currentGroupId } = route.params
  
  return (
    <HomeStack.Navigator initialRouteName="main" mode="modal">
      <HomeStack.Screen 
        name="mainContainer" 
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
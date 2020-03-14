import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthentificationNavigator from './navigations';
import styled from 'styled-components';
import { COLORS } from './constants/Styles';

const App = () => {
  return (
    <Container>
      <AuthentificationNavigator />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`
export default App;

import React from 'react';
import styled from 'styled-components';
import { COLORS } from './constants/Styles';
import Navigator from './navigations/index';

const App = ({navigation}) => {
  return (
    <Container>
      <Navigator/>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`
export default App;

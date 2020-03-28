import React from 'react';
import styled from 'styled-components';
import { COLORS } from './constants/Styles';
import Navigator from './navigations/index';
import {decode, encode} from 'base-64'

const App = ({navigation}) => {
// atobがないとのエラーがfirebaseで出るので、代入する
if (!window.btoa) {  window.btoa = encode }
if (!window.atob) { window.atob = decode }
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

import React from 'react';
import styled from 'styled-components';
import { COLORS } from './constants/Styles';
import Navigator from './navigations/index';
import {decode, encode} from 'base-64'
import store from './reducers'
import { Provider } from 'react-redux'
import { YellowBox } from 'react-native'

// シミュレーション上の Setting a timer エラーを非表示
YellowBox.ignoreWarnings([
  'Setting a timer'
])

const App = ({navigation}) => {
// atobがないとのエラーがfirebaseで出るので、代入する
if (!window.btoa) {  window.btoa = encode }
if (!window.atob) { window.atob = decode }

  return (
    <Container>
      <Provider store={store}>
        <Navigator/>
      </Provider>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`
export default App;

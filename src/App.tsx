import React from 'react';
import styled from 'styled-components';
import { COLORS } from './constants/Styles';
import Navigator from './navigations';
import {decode, encode} from 'base-64'
import store from './reducers'
import { Provider } from 'react-redux'
import { YellowBox, Clipboard } from 'react-native'
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet'

if (__DEV__) {
  Clipboard.setString('')
}

const App = () => {
// atobがないとのエラーがfirebaseで出るので、代入する
if (!window.btoa) {  window.btoa = encode }
if (!window.atob) { window.atob = decode }

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'RNDeviceInfo', 'Warning: An update']);

  return (
    <Container>
      <Provider store={store}>
        <ActionSheetProvider>
          <Navigator/>
        </ActionSheetProvider>
      </Provider>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`
const Application = connectActionSheet(App)
export default Application;

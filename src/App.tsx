import React from 'react';
import styled from 'styled-components';
import Constants from 'expo-constants'
import { Provider } from 'react-redux'
import { YellowBox, Clipboard } from 'react-native'
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet'
import Bugsnag from '@bugsnag/expo'
import BugsnagPluginReact from '@bugsnag/plugin-react'
// import components
import ErrorComponent from './common/Error'
// import constants
import { COLORS } from './constants/Styles';
// import navigations
import Navigator from './navigations';
// import store
import store from './reducers'
import {decode, encode} from 'base-64'
// import utils
import { dispapperWarning } from './utilities/disappearWarning'


Bugsnag.start({
  apiKey: Constants.manifest.extra.bugsnag.apiKey,
  plugins: [new BugsnagPluginReact()],
  enabledReleaseStages: ['production']
})

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

if (__DEV__) {
  Clipboard.setString('')
}

const App = () => {
// atobがないとのエラーがfirebaseで出るので、代入する
if (!window.btoa) {  window.btoa = encode }
if (!window.atob) { window.atob = decode }
  dispapperWarning()

  return (
    <ErrorBoundary FallbackComponent={ErrorComponent}>
      <Container>
        <Provider store={store}>
          <ActionSheetProvider>
            <Navigator/>
          </ActionSheetProvider>
        </Provider>
      </Container>
    </ErrorBoundary>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`
const Application = connectActionSheet(App)
export default Application;

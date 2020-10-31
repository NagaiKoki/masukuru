import { YellowBox } from 'react-native'

const disapperWaningType = [
  'Warning: isMounted(...) is deprecated', 
  'Module RCTImageLoader', 
  'RNDeviceInfo', 
  'Warning: An update', 
  'Animated.event now requires a second argument for option', 
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
  '[bugsnag], Session not sent due to releaseStage/enabledReleaseStages configuration'
]

export const dispapperWarning = () => {
  YellowBox.ignoreWarnings(disapperWaningType);
}
import { YellowBox } from 'react-native'

const disapperWaningType = [
  'Warning: isMounted(...) is deprecated', 
  'Module RCTImageLoader', 
  'RNDeviceInfo', 
  'Warning: An update', 
  'Animated.event now requires a second argument for option', 
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
  'Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.',
  'Require cycle: src/sagas/index.ts -> src/sagas/suggestRecord.ts -> src/sagas/index.ts'
]

export const dispapperWarning = () => {
  YellowBox.ignoreWarnings(disapperWaningType);
}
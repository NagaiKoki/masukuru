import { Platform, Dimensions } from 'react-native';

const EIGHT_HEIGHT = 667;

export const lessThanIphoneEightHeight = () => {
  const { height } = Dimensions.get('window')
  return (
    Platform.OS === 'ios' && height <= EIGHT_HEIGHT
  )
}
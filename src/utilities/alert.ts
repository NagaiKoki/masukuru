import { Alert } from 'react-native'

export const reactAlert = (text: string, handleOnClick: () => void) => {
  Alert.alert(
    text,
    "本当によろしいですか？", 
    [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => {handleOnClick}
      }
    ],
    { cancelable: false }
  )
}
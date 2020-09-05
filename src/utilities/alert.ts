import { Alert } from 'react-native'

export const reactAlert = (handleOnClick: any) => {
  Alert.alert(
    'この記録を削除します。',
    "本当によろしいですか？", 
    [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => {() => handleOnClick()}
      }
    ],
    { cancelable: false }
  )
}
import { Alert } from 'react-native'

export const handleAlert = (title: string, subTitle: string, buttonText: string, func: () => void) => {
  Alert.alert(
    title,
    subTitle,
    [
      {
        text: "キャンセル",
        style: 'cancel'
      },
      {
        text: buttonText,
        onPress: () => func()
      }
    ],
    { cancelable: false }
  )
}
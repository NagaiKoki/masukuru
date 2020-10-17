import { Alert } from 'react-native'

export const handleAlert = (title: string, subTitle: string, buttonText: string, func: Function) => (arg?: any) => {
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
        onPress: () => func(arg)
      }
    ],
    { cancelable: false }
  )
}
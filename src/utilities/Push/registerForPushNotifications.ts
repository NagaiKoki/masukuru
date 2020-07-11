import { Alert, Platform } from 'react-native'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export const registerForPushNotificationsAsync = async () => {
  let token: string
  if (Constants.isDevice) {
    const { status: existingStatus }: { status: Permissions.PermissionStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status }: { status: Permissions.PermissionStatus } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }

    if (finalStatus !== "granted") {
      Alert.alert('プッシュ通知が許可されていません。')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
  } else {
    Alert.alert('simulatorではプッシュ通知が届きません。')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token
}
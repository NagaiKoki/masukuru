// import apis
import { requestFetchUser } from '../../apis/Users'
// import types
import { UserType } from '../../types/User'

export const sendPushNotification = async (uid: string, title: string, body: string) => {
  const { user }: { user?: UserType } = await requestFetchUser(uid)
  if (!user || (user && !user.expoNotificationToken)) return

  const message = {
    to: user.expoNotificationToken,
    sound: 'default',
    title: title,
    body: body,
    data: { data: 'test' }
  }
  
  // expo serverに対して直接送信する
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message)
  })
}
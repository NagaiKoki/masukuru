import firebase, { db } from '../../config/firebase'
// import types
import { UserType } from '../../types/User'
// import apis
import { requestFetchGroupUserIds } from '../Groups'
import { requestFetchUser } from '../../apis/Users'

export const requestPutExpoNotificationToken = async (token: string) => {
  const uid = firebase.auth().currentUser.uid
  const currentUser = db.collection('users').doc(uid)

  try {
    await currentUser.update({
      expoNotificationToken: token
    })
    return { payload: 'success' }
  } catch (e) {
    return { error: e }
  }
}

export const isSetExpoNotificationToken = async () => {
  const uid = firebase.auth().currentUser.uid
  const currentUser = db.collection('users').doc(uid)

  await currentUser.get().then(snap => {
    if (!snap.exists) {
      throw new Error('no data')
    } else {
      return snap.data().expoNotificationToken ? true : false
    }
  })
}

export const requestSendPushNotification = async (uid: string, title: string, body: string) => {
  const { user }: { user?: UserType } = await requestFetchUser(uid)
  if (!user || (user && !user.expoNotificationToken)) {
    return new Error()
  }

  const message = {
    to: user.expoNotificationToken,
    sound: 'default',
    title: title,
    body: body,
    data: { data: 'test' }
  }

  try {
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

    return { success: 'success' }
  } catch(error) {
    console.log(error)
    return { error: 'プッシュ通知の送信に失敗しました。' }
  }
}

export const requestSendRecordPostNotification = async () => {
  const { payload, error }: { payload?: string[], error?: string } = await requestFetchGroupUserIds()
  const currentUserName = firebase.auth().currentUser.displayName
  const title = `⭐${currentUserName}さんの新しい投稿`
  const body = `${currentUserName}さんが、トレーニングの記録を投稿しました！確認してみましょう！`

  if (payload && !error) {
    Promise.all(payload.map( async id => {
      await requestSendPushNotification(id, title, body)
    }))
  }
}
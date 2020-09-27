import firebase, { db } from '../../config/firebase'
// import types
import { UserType, GroupUserType } from '../../types/User'
// import apis
import { requestFetchUser } from '../../apis/Users'
// import constants
import { COMMON_ERROR_MESSSAGE } from '../../constants/errorMessage'

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
  if (!user || (user && !user.expoNotificationToken) || firebase.auth().currentUser.uid === uid) {
    return new Error('no data')
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
    return { error: 'プッシュ通知の送信に失敗しました。' }
  }
}

// 現在所属しているグループに所属しているユーザーでプッシュ通知の許可をしているidを取得する
export const requestFetchGroupUserIds = async () => {
  const currentUserId = firebase.auth().currentUser.uid
  const groupUserRef = db.collectionGroup('groupUsers').where('uid', '==', currentUserId).get()
  let belongGroupIds = []
  let groupUserIds = []
  
  try {
    await groupUserRef.then(snap => {
      snap.forEach(doc => {
        belongGroupIds.push(doc.ref.parent.parent.id)
      })
    })

    await Promise.all(belongGroupIds.map(async id => {
      await db.collection('groups').doc(id).collection('groupUsers').get().then(snap => {
        snap.forEach(doc => {
          const groupUser = doc.data() as GroupUserType
            groupUserIds.push(groupUser.uid)
        })
      })
    }))

    // idが重複する場合があるので、重複を除去する
    const ids = Array.from(new Set(groupUserIds))
    return { payload: ids }
  
  } catch(error) {
    return { error: COMMON_ERROR_MESSSAGE.TRY_AGAIN }
  }
}

const requestCheckPermissionRecordPushByUserIds = async (userIds: string[]) => {
  let ids: string[] = []
  try {
    await Promise.all(userIds.map( async id => {
      await db.collection('users').doc(id).get().then( snap => {
        const data = snap.data() as UserType
        if (data.isRecordPostPush || data.isRecordPostPush === undefined) {
          ids.push(id)
        }
      })
    }))

    return { userIds: ids }
  } catch(error) {
    return { error: COMMON_ERROR_MESSSAGE.TRY_AGAIN }
  }
}

export const requestSendRecordPostNotification = async () => {
  const { payload, error }: { payload?: string[], error?: string } = await requestFetchGroupUserIds()
  const currentUserName = firebase.auth().currentUser.displayName
  const title = `⭐ ${currentUserName}さんの新しい投稿`
  const body = `${currentUserName}さんが、トレーニングを投稿しました！確認してみましょう！`

  const { userIds } = await requestCheckPermissionRecordPushByUserIds(payload)

  if (userIds && !error) {
    await Promise.all(userIds.map( async id => {
      await requestSendPushNotification(id, title, body)
    }))
  }
}
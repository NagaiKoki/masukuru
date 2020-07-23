import { Timestamp } from '@firebase/firestore-types';
import firebase, { db } from '../../config/firebase';
// import apis
import { requestCurrentGroupId } from '../../apis/Groups/transfer'
// import types
import { NotificationEventType, NotificationType } from '../../types/Notification'
// import constants
import { COMMON_ERROR_MESSSAGE } from '../../constants/errorMessage'

// お知らせの取得
export const requestNotifications = async () => {
  const currentUserId = firebase.auth().currentUser.uid
  const notifications = [];

  try {
    await db.collection('notifications').orderBy('createdAt', 'desc').get().then(snap => {
      snap.forEach(doc => {
        const data = doc.data()
        data.id = doc.ref.id
        notifications.push(data)
      })
    })
  
    await db.collection('users').doc(currentUserId).collection('notification').get().then(snap => {
      snap.forEach(doc => {
        const data = doc.data()
        data.id = doc.ref.id
        notifications.push(data)
      })
    })

    if (notifications.length) {
      const orderedNotification = notifications.sort((a: NotificationType, b: NotificationType) => { return a.createdAt < b.createdAt ? 1 : -1 })
      return { payload: orderedNotification }
    } else {
      return { payload: [] }
    }
  } catch {
    return { error: COMMON_ERROR_MESSSAGE.TRY_AGAIN }
  }
}

// 未読お知らせの取得
export const requestUnReadNotificationSize = async (uid: string) => {
  const readIds = [];
  let maxNotificationSize = 0
  try {
    await db.collection('notifications').get().then(snap => {
      maxNotificationSize = snap.size
      snap.forEach(doc => {
        if (doc.data().readUserIds.some(id => id === uid)) {
          readIds.push(1)
        }
      })
    })
    const unReadSize = maxNotificationSize - readIds.length
    if (unReadSize) {
      return { size: unReadSize }
    } else {
      return { size: 0 }
    }
  } catch (error) {
    return { error: error }
  }
}

// 既読リクエスト
export const requestReadNotification = async (id: string) => {
  const currentUser = firebase.auth().currentUser
  let readNotification: boolean
  let payload: string
  try {
    const refNotification = db.collection('notifications').doc(id)
    await refNotification.get().then( async snap => {
      if (!snap.exists) throw new Error('error')
      if (snap.data().readUserIds.some(id => id === currentUser.uid)) {
        readNotification = true
      } else {
        await db.collection('notifications').doc(id).update({
          readUserIds: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
        })
        payload = 'success'
      }
    })
    return { payload: payload, readNotification: readNotification }
  } catch (error) {
    return { error: error }
  }
}

// 記録の通知リクエスト
export const requestPostCommentNotification = async (recordUserId: string, recordId: string, notificationEventType: NotificationEventType) => {
  const  currentUserId = firebase.auth().currentUser.uid
  try {
    const currentGroupId = await requestCurrentGroupId()
    const currentUserRef = db.collection('users').doc(recordUserId)
    await currentUserRef.collection('notification').add({
      type: notificationEventType,
      uid: recordUserId,
      from: currentUserId,
      recordId: recordId,
      groupId: currentGroupId,
      read: false
    })
    return { success: 'success' }
  } catch {
    return { error: "通知のポストに失敗しました。" }
  }
}
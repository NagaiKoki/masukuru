import firebase, { db } from '../../config/firebase';

// お知らせの取得
export const requestNotifications = async () => {
  const notifications = [];
  await db.collection('notifications').get().then(snap => {
    snap.forEach(doc => {
      const data = doc.data()
      data.id = doc.ref.id
      notifications.push(data)
    })
  })
  return notifications
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
  try {
    await db.collection('notifications').doc(id).update({
      readUserIds: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
    })
    return { payload: 'success' }
  } catch (error) {
    console.log(error)
    return { error: error }
  }
}
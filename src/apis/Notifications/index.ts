import firebase, { db } from '../../config/firebase';

export const requestNotifications = async () => {
  const notifications = [];
  await db.collection('notifications').get().then(snap => {
    snap.forEach(doc => {
      notifications.push(doc.data())
    })
  })
  return notifications
}

export const requestUnReadNotificationSize = async (uid: string) => {
  const unReadIds = [];
  let maxNotificationSize = 0
  try {
    await db.collection('notifications').get().then(snap => {
      maxNotificationSize = snap.size
      snap.forEach(doc => {
        if (!doc.data().readUserIds.find(id => id === uid)) {
          unReadIds.push(1)
        }
      })
    })
    const unReadSize = maxNotificationSize - unReadIds.length
    if (unReadSize) {
      return { size: unReadSize }
    } else {
      return { size: 0 }
    }
  } catch (error) {
    return { error: error }
  }
}
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
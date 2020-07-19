import firebase, { db } from '../../config/firebase'

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
// import config
import firebase, { db } from '../../config/firebase'
// import types
import { UserType } from '../../types/User'

export const requestFetchSettings = async () => {
  const currentUserId = firebase.auth().currentUser.uid
  const userRef = db.collection('users').doc(currentUserId).get()
  let userSettingObj;

  try {
    await userRef.then(snap => {
      const data = snap.data() as UserType
      userSettingObj = { isCommentPush: !!data.isCommentPush }
    })
    return { payload: userSettingObj }
  } catch (error) {
    return { error: "error" }
  }
}

export const requestPutCommentPushNotification = async () => {
  const currentUserId = firebase.auth().currentUser.uid
  const userRef = db.collection('users').doc(currentUserId).get()

  try {
    userRef.then(snap => {
      const data = snap.data() as UserType
      snap.ref.update({ isCommentPush: !data.isCommentPush })
    })
    return { payload: 'success' }
  } catch(error) {
    return { error: "error" }
  }
}
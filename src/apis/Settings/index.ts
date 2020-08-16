// import config
import firebase, { db } from '../../config/firebase'
// import types
import { UserType, GroupUserType } from '../../types/User'
import { SettingPushNotificationType, ResponseSettingType } from '../../types/Setting'

export const requestFetchSettings = async () => {
  const currentUserId = firebase.auth().currentUser.uid
  const userRef = db.collection('users').doc(currentUserId).get()
  let userSettingObj: ResponseSettingType

  try {
    await userRef.then(snap => {
      const data = snap.data() as UserType
      userSettingObj = { isCommentPush: data.isCommentPush, isRecordPostPush: data.isRecordPostPush }
    })
    // firestoreの初期値は値がない場合undefiendになるので、マウント時にundefiendはtrueに変換する
    if (userSettingObj.isCommentPush === undefined) {
      await requestPutPushNotificationSetting('comment')
      userSettingObj = { ...userSettingObj, isCommentPush: true }
    }
    if (userSettingObj.isRecordPostPush === undefined) {
      await requestPutPushNotificationSetting('recordPost')
      userSettingObj = { ...userSettingObj, isRecordPostPush: true }
    }
    return { payload: userSettingObj }
  } catch (error) {
    return { error: "error" }
  }
}

export const requestPutPushNotificationSetting = async (type: SettingPushNotificationType) => {
  const currentUserId = firebase.auth().currentUser.uid
  const userRef = db.collection('users').doc(currentUserId).get()
  const groupUserRef = db.collectionGroup('groupUsers').where('uid', '==', currentUserId).get()

  try {
    await userRef.then(snap => {
      const data = snap.data() as UserType
      switch(type) {
        case 'comment': {
          snap.ref.update({ isCommentPush: !data.isCommentPush })
        }
        case 'recordPost': {
          snap.ref.update({ isRecordPostPush: !data.isRecordPostPush })
        }
      }
    })

    await groupUserRef.then(snap => {
      snap.forEach(doc => {
        const data = doc.data() as GroupUserType
        switch(type) {
          case 'comment': {
            return doc.ref.update({ isCommentPush: !data.isCommentPush })
          }
          case 'recordPost': {
            return doc.ref.update({ isRecordPostPush: !data.isRecordPostPush })
          }
        }
      })
    })

    return { payload: 'success' }
   } catch(error) {
      return { error: "error" }
  }
}
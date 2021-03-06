// import config
import firebase, { db } from '../../config/firebase'
// import types
import { UserType } from '../../types/User'
import { SettingType, ResponseSettingType } from '../../types/Setting'

export const requestFetchSettings = async () => {
  const currentUserId = firebase.auth().currentUser.uid
  const userRef = db.collection('users').doc(currentUserId).get()
  let userSettingObj: ResponseSettingType

  try {
    await userRef.then(snap => {
      const data = snap.data() as UserType
      userSettingObj = { 
        isCommentPush: data.isCommentPush, 
        isRecordPostPush: data.isRecordPostPush, 
        isEmojiReactionPush: data.isEmojiReactionPush,
        visibleWeight: !!data.visibleWeight
      }
    })
    // firestoreの初期値は値がない場合undefiendになるので、マウント時にundefiendはtrueに変換する
    if (userSettingObj.isCommentPush === undefined) {
      await requestPutSetting('comment')
      userSettingObj = { ...userSettingObj, isCommentPush: true }
    }
    if (userSettingObj.isRecordPostPush === undefined) {
      await requestPutSetting('recordPost')
      userSettingObj = { ...userSettingObj, isRecordPostPush: true }
    }
    if (userSettingObj.isEmojiReactionPush === undefined) {
      await requestPutSetting('emoji')
      userSettingObj = { ...userSettingObj, isEmojiReactionPush: true }
    }
    return { payload: userSettingObj }
  } catch (error) {
    return { error: "error" }
  }
}

export const requestPutSetting = async (type: SettingType) => {
  const currentUserId = firebase.auth().currentUser.uid
  const userRef = db.collection('users').doc(currentUserId).get()
  
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
        case 'emoji': {
          snap.ref.update({ isEmojiReactionPush: !data.isEmojiReactionPush })
        }
        case 'visibleWeight': {
          snap.ref.update({ visibleWeight: !data.visibleWeight })
        }
      }
    })

    return { payload: 'success' }
   } catch(error) {
      return { error: "error" }
  }
}
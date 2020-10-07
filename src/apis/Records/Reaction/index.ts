import firebase, { db } from '../../../config/firebase';
// import types
import { ResponseEmojiReactionType, EmojiReactionType } from '../../../types/Record'
// import constants
import { COMMON_ERROR_MESSSAGE } from '../../../constants/errorMessage'
// import utils
import { factoryRandomCode } from '../../../utilities/randomTextFactory'
import { convertFirebaseTimeStamp } from '../../../utilities/timestamp'
// import apis
import { requestFetchCurrentGroupId } from '../../Groups/v1'

// 記録へのコメント送信
export const requestPostRecordPost = async (recordId: string, text: string, notificationGroupId?: string) => {
  const currentUser = firebase.auth().currentUser
  const { payload } = await await requestFetchCurrentGroupId()
  const currentGroupId = notificationGroupId || payload
  const currentFirestoreTime = firebase.firestore.FieldValue.serverTimestamp()
  const currentDateTime = new Date()
  const docId = factoryRandomCode(20)

  try {
    const recordRef = db.collection('records').doc(recordId)
    await recordRef.collection('comments').add({
      uid: currentUser.uid,
      recordId,
      content: text,
      groupId: currentGroupId,
      createdAt: currentFirestoreTime,
      updatedAt: currentFirestoreTime
    })
    const commentPayload = {
      id: docId,
      uid: currentUser.uid,
      recordId,
      content: text,
      groupId: currentGroupId,
      createdAt: currentDateTime,
      updatedAt: currentDateTime
    }
    return { payload: commentPayload }
  } catch (error) {
    return { error: COMMON_ERROR_MESSSAGE.TRY_AGAIN }
  }
}

// 記録のコメント取得
export const requestGetRecordComments = async (recordId: string) => {
  let comments = []
  try {
    await db.collection('records').doc(recordId).collection('comments').orderBy('createdAt', 'asc').get().then(snap => {
      snap.forEach(doc => {
        if (!doc.exists) {
          return { payload: [] }
        }
        const data = doc.data()
        data.id = String(doc.ref.id)
        comments.push(data)
      })
    })
    return { payload: comments }
  } catch (error) {
    return { error: COMMON_ERROR_MESSSAGE.TRY_AGAIN }
  }
}

// 記録のコメント数取得
export const requestGetFetchRecordCommentsSize = async (recordId: string) => {
  const { payload } = await requestFetchCurrentGroupId()
  let size: number
  try {
    const commentRef = db.collection('records').doc(recordId).collection('comments').where('groupId', '==', payload)
    await commentRef.get().then(snap => {
      size = snap.size
    })
    return { payload: size }
  } catch (error) {
    return { error: COMMON_ERROR_MESSSAGE.TRY_AGAIN }
  }
}

// 記録のコメント削除
export const requestFetchDeleteRecordComment = async (recordId: string, commnetId: string) => {
  try {
    const commentRef = db.collection('records').doc(recordId).collection('comments').doc(commnetId)
    await commentRef.delete()
    return { payload: 'success' }
  } catch (error){
    return { error: COMMON_ERROR_MESSSAGE.TRY_AGAIN }
  }
}

export const requestFetchPostEmojiReaction = async (recordId: string, emojiIndex: number) => {
  const currentUser = firebase.auth().currentUser
  const recordRef = db.collection('records').doc(recordId)
  const { payload } = await requestFetchCurrentGroupId()

  const EmojiObj = {
    groupId: payload,
    emojiIndex,
    uid: currentUser.uid,
    recordId,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  const responseEmojiReaction: ResponseEmojiReactionType = {
    id: '',
    groupId: payload,
    emojiIndex,
    uid: currentUser.uid,
    recordId,
    createdAt: convertFirebaseTimeStamp(new Date()),
    updatedAt: convertFirebaseTimeStamp(new Date()),
  }

  try {
    const emojiRef = await recordRef.collection('emoji').add(EmojiObj)
    responseEmojiReaction.id = emojiRef.id
    return { payload: responseEmojiReaction }
  } catch(error) {
    return { error }
  }
}

export const requestFetchGetEmojiReaction = async (recordId: string) => {
  const { payload } = await requestFetchCurrentGroupId()
  const recordRef = db.collection('records').doc(recordId)
  const emojiRef = recordRef.collection('emoji').where('groupId', '==', payload).get()
  const reaction: ResponseEmojiReactionType[] = []

  try {
    await emojiRef.then(snap => {
      if (snap.empty) {
        return { payload: [] }
      }
      snap.forEach(doc => {
        const data = doc.data() as ResponseEmojiReactionType
        data.id = doc.id
        reaction.push(data)
      })
    })

    const emojiPayload: EmojiReactionType = {
      recordId,
      emojiReactions: reaction
    }

    return { payload: emojiPayload }
  } catch(error) {
    return { error }
  }
}

export const requestFetchDeleteEmojiReaction = async (recordId: string, id: string) => {
  const emojiRef = db.collection('records').doc(recordId).collection('emoji').doc(id)
  try {
    await emojiRef.delete()
    return { payload: 'success' }
  } catch(error) {
    return { error }
  }
}
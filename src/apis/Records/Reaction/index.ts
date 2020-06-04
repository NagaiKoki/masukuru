import firebase, { db } from '../../../config/firebase';
// import constants
import { COMMON_ERROR_MESSSAGE } from '../../../constants/errorMessage'
// import lib
import { factoryRandomCode } from '../../../lib/randomTextFactory'
// import apis
import { requestCurrentGroupId } from '../../Groups/transfer'

// 記録へのコメント送信
export const requestPostRecordPost = async (recordId: string, text: string) => {
  const currentUser = firebase.auth().currentUser
  const currentGroupId = await requestCurrentGroupId()
  const currentFirestoreTime = firebase.firestore.FieldValue.serverTimestamp()
  const currentDateTime = new Date
  const docId = factoryRandomCode(20)
  
  try {
    const recordRef = db.collection('records').doc(recordId)
    await recordRef.collection('comments').add({
      uid: currentUser.uid,
      recordId: recordId,
      content: text,
      groupId: currentGroupId,
      createdAt: currentFirestoreTime,
      updatedAt: currentFirestoreTime
    })
    const commentPayload = {
      id: docId,
      uid: currentUser.uid,
      recordId: recordId,
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
  const currentGroupId = await requestCurrentGroupId()
  let size: number
  try {
    const commentRef = db.collection('records').doc(recordId).collection('comments').where('groupId', '==', currentGroupId)
    await commentRef.get().then(snap => {
      size = snap.size
    })
    return { payload: size }
  } catch (error) {
    return { error: COMMON_ERROR_MESSSAGE.TRY_AGAIN }
  }
}

// 記録のコメント削除
export const requestDeleteRecordComment = async (recordId: string, commnetId: string) => {
  try {
    const commentRef = db.collection('records').doc(recordId).collection('comments').doc(commnetId)
    await commentRef.delete()
    return { payload: 'success' } 
  } catch (error){
    return { error: COMMON_ERROR_MESSSAGE.TRY_AGAIN }
  }
}
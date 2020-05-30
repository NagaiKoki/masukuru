import firebase, { db } from '../../../config/firebase';
// import constants
import { COMMON_ERROR_MESSSAGE } from '../../../constants/errorMessage'
// import lib
import { factoryRandomCode } from '../../../lib/randomTextFactory'

// 記録へのコメント送信
export const requestPostRecordPost = async (recordId: string, text: string) => {
  const currentUser = firebase.auth().currentUser
  const currentTime = firebase.firestore.FieldValue.serverTimestamp()
  const docId = factoryRandomCode(20)
  
  try {
    const recordRef = db.collection('records').doc(recordId)
    await recordRef.collection('comments').add({
      uid: currentUser.uid,
      recordId: recordId,
      content: text,
      createdAt: currentTime,
      updatedAt: currentTime
    })
    const commentPayload = {
      id: docId,
      uid: currentUser.uid,
      recordId: recordId,
      content: text,
      createdAt: currentTime,
      updatedAt: currentTime
    }
    return { payload: commentPayload }
  } catch (error) {
    console.log(error);
    return { error: COMMON_ERROR_MESSSAGE.TRY_AGAIN }
  }
}
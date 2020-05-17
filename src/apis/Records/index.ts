import firebase, { db } from '../../config/firebase';
// import types
import { RecordItemType } from '../../types/Record'
// import lib
import { factoryRandomCode } from '../../lib/randomTextFactory'

export const requestPostRecords = async (records: RecordItemType[], word: string) => {
  const uid = firebase.auth().currentUser.uid
  const currentTime = firebase.firestore.FieldValue.serverTimestamp()
  const docId = factoryRandomCode(20)
  try {
    await db.collection('records').doc(docId).set({
      records: records,
      uid: uid,
      word: word,
      createdAt: currentTime,
      updatedAt: currentTime
    })
    return { payload: 'success' }
  } catch (error) {
    return { error: error }
  }
}
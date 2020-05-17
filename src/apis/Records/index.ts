import firebase, { db } from '../../config/firebase';
// import types
import { RecordItemType } from '../../types/Record'
// import lib
import { factoryRandomCode } from '../../lib/randomTextFactory'

// 記録のポスト
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

// 記録取得
export const requestFetchRecord = async (uid?: string, startAt?: any) => {
  const records = []
  try {
    await db.collection('records').where('uid', '==', uid).limit(10).get().then(snap => {
      snap.forEach(doc => {
        records.push(doc.data())
      })
    })
    return { payload: records }
  } catch (error) {
    return { error: error }
  }
} 
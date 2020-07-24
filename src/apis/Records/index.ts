import firebase, { db } from '../../config/firebase';
// import types
import { RecordItemType } from '../../types/Record'
// import lib
import { factoryRandomCode } from '../../utilities/randomTextFactory'
// import constants
import { COMMON_ERROR_MESSSAGE } from '../../constants/errorMessage'

// 記録のポスト
export const requestPostRecords = async (records: RecordItemType[], word: string) => {
  const uid = firebase.auth().currentUser.uid
  const currentTime = firebase.firestore.FieldValue.serverTimestamp()
  const docId = factoryRandomCode(20)
  const groupIds = []
  try {
    await db.collectionGroup('groupUsers').where('uid', '==', uid).get().then(snap => {
      snap.forEach(doc => {
        groupIds.push(doc.ref.parent.parent.id)
      })
    })
    
    await db.collection('records').doc(docId).set({
      records: records,
      uid: uid,
      word: word,
      groupIds: groupIds,
      createdAt: currentTime,
      updatedAt: currentTime
    })
    return { payload: 'success' }
  } catch (error) {
    return { error: error }
  }
}

// 記録取得
export const requestFetchRecord = async (uid?: string, startAt?: any, groupId?: string) => {
  const records = []
  let ref;
  
  try {
    if (uid && startAt) {
      ref = db.collection('records').where('uid', '==', uid).orderBy("createdAt", "desc").startAfter(startAt.createdAt).limit(5)
    } else if (uid && !startAt) {
      ref = db.collection('records').where('uid', '==', uid).orderBy("createdAt", "desc").limit(5)
    } else if (groupId && startAt) {
      ref = db.collection('records').where('groupIds', 'array-contains', groupId).orderBy("createdAt", "desc").startAfter(startAt.createdAt).limit(5)
    } else if (groupId && !startAt) {
      ref = db.collection('records').where('groupIds', 'array-contains', groupId).orderBy("createdAt", "desc").limit(5)
    }
    await ref.get().then(snap => {
      snap.forEach(doc => {
        const data = doc.data()
        data.id = String(doc.ref.id)
        records.push(data)
      })
    })
    return { payload: records }
  } catch (error) {
    return { error: error }
  }
}

// 記録の削除
export const requestDestroyRecord = async (id: string) => {
  try {
    const ref = db.collection('records').doc(id)
    await ref.delete()
    return { payload: 'success' }
  } catch (error) {
    return { error: '削除に失敗しました。' }
  }
}

// グループ切り替えの際に、最大20件の記録に遷移先のgroupIdを書き込む
export const requestUpdateRecordGroupIds = async (groupId: string) => {
  const currentUser = firebase.auth().currentUser
  try {
    const recordRef = db.collection('records').where('uid', '==', currentUser.uid).orderBy('createdAt', 'desc').limit(20)
    await recordRef.get().then(snap => {
      snap.forEach(doc => {
        doc.ref.update({
          groupIds: firebase.firestore.FieldValue.arrayUnion(groupId)
        })
      })
    })
    return { payload: 'success' }
  } catch (error) {
    return { error }
  }
}

export const requestFetchRecordItem = async (recordId: string) => {
  const recordRef = db.collection('records').doc(recordId)
  let record;

  try {
    await recordRef.get().then(snap => {
      if (!snap.exists) {
        throw new Error('no data')
      } else {
        record = snap.data()
        record.id = String(snap.ref.id)
      }
    })
    return { payload: record }
  } catch {
    return { erorr: COMMON_ERROR_MESSSAGE }
  }
}
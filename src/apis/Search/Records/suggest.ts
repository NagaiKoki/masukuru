// import config
import firebase, { db } from '../../../config/firebase'
// import types
import { SuggestRecordType } from '../../../types/Search/Record/suggest'
// import constants
import { COMMON_ERROR_MESSSAGE } from '../../../constants/errorMessage'

// サジェスト用にfirestoreに記録名と回数を保存する
export const requestPutSuggestForRecordTimes = async (name: string) => {
  const currentUserId = firebase.auth().currentUser.uid
  const currentDateTime = new Date
  const suggestRef = db.collection('users').doc(currentUserId).collection('suggests').where('name', "==", name).get()

  try {
    await suggestRef.then(snap => {
      if (!snap.empty) {
        snap.forEach(doc => {
          const suggestData = doc.data() as SuggestRecordType
          const times: number = suggestData.times
          doc.ref.update({ time: times + 1, updatedAt: currentDateTime })
        })
      } else {
        const suggestObj: SuggestRecordType = {
          name: name,
          times: 1,
          createdAt: currentDateTime,
          updatedAt: currentDateTime
        }
        db.collection('users').doc(currentUserId).collection('suggests').add(suggestObj)
      }
    })

    return { success: 'success' }
  } catch (error) {
    return { error: COMMON_ERROR_MESSSAGE.TRY_AGAIN }
  }
}
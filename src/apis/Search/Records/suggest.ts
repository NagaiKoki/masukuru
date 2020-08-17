// import config
import firebase, { db } from '../../../config/firebase'
// import types
import { SuggestRecordType } from '../../../types/Search/Record/suggest'
// import constants
import { COMMON_ERROR_MESSSAGE } from '../../../constants/errorMessage'
// import utils
import { findSuggestRecordByKeyword } from '../../../utilities/Record/findSuggestRecord'
import { lessThanIphoneEightHeight } from '../../../utilities/Device/'

// サジェスト用にfirestoreに記録名と回数を保存する
export const requestPutSuggestRecord = async (name: string) => {
  const currentUserId = firebase.auth().currentUser.uid
  const currentDateTime = new Date
  const suggestRef = db.collection('users').doc(currentUserId).collection('suggests').where('name', "==", name).get()
  
  try {
    await suggestRef.then(async snap => {
      if (!snap.empty) {
        snap.forEach(async doc => {
          const suggestData = doc.data() as SuggestRecordType
          const times: number = suggestData.times
          await doc.ref.update({ times: times + 1, updatedAt: currentDateTime })
        })
      } else {
        const suggestObj: SuggestRecordType = {
          name: name,
          times: 1,
          createdAt: currentDateTime,
          updatedAt: currentDateTime
        }
        await db.collection('users').doc(currentUserId).collection('suggests').add(suggestObj)
      }
    })

    return { success: 'success' }
  } catch (error) {
     console.log(error)
    return { error: COMMON_ERROR_MESSSAGE.TRY_AGAIN }
  }
}

// サジェストで出す候補を取得する
export const requestFetchSuggestRecord = async (keyword?: string) => {
  const limitSize = lessThanIphoneEightHeight() ? 4 : 5
  const currentUserId = firebase.auth().currentUser.uid
  const suggestRefNoNmae = db.collection('users').doc(currentUserId).collection('suggests').orderBy("times", "desc").limit(limitSize).get()
  const suggestRefWithName = db.collection('users').doc(currentUserId).collection('suggests').orderBy('name').startAt(keyword).endAt(keyword + '\uf8ff').limit(limitSize).get()
  const suggestRef = keyword ? suggestRefWithName : suggestRefNoNmae
  let names: string[] = []

  try {
    await suggestRef.then(snap => {
      snap.forEach(doc => {
        const suggestData = doc.data() as SuggestRecordType
        const name = suggestData.name
        names.push(name)
      })
    })

    // キーワードが存在する場合で、登録済みのトレーニングの中にない場合 or ある場合でも数が5以下の場合
    if (!!keyword && (!names.length || names.length < 5)) {
      const defaultFilteredNames = findSuggestRecordByKeyword(keyword)
      const filterdNames = names.concat(defaultFilteredNames)
      const payload = Array.from(new Set(filterdNames.splice(0, 5)))
      return { payload: payload }
    } else {
      return { payload: names }
    }
  } catch (error) {
    console.log(error)
    return { error: COMMON_ERROR_MESSSAGE.TRY_AGAIN }
  }
}
import firebase, { db } from '../../config/firebase'
// import types
import { 
  UserWeightType, 
  ChartTermType,
  RequestChartSettingType,
  ResponseChartSettingType
} from '../../types/Chart'
// import utils 
import { 
  getDayOfStortToday, 
  convertFirebaseTimeStamp, 
  getMidnightTime
} from '../../utilities/timestamp'
import { getHeadDay } from '../../utilities/Chart'

export const requestFetchWeights = async (date: Date, type: ChartTermType) => {
  const currentUserId = firebase.auth().currentUser.uid
  const endDate = getMidnightTime(date) // 引数の日の正子を取得する 
  const headDate = getHeadDay(endDate, type)
  const userRef = db.collection('users').doc(currentUserId).collection('weights').where('date', '>=', headDate).where('date', '<=', endDate).get()

  let weights: UserWeightType[] = []
  try {
    await userRef.then(snap => {
      snap.forEach(doc => {
        const data = doc.data() as UserWeightType
        weights.push(data)
      })
    })
    console.log(weights.length)
    return { payload: weights }
  } catch(error) {
    console.log(error)
    return { error: error }
  }
}

export const requestPostWeight = async (weight: number, date: Date) => {
  const currentUserId = firebase.auth().currentUser.uid
  const currentTime = firebase.firestore.FieldValue.serverTimestamp()
  const startToday = convertFirebaseTimeStamp(getDayOfStortToday(date))
  // 記録日が同じの場合はアップデート対象とする
  const userRef = db.collection('users').doc(currentUserId).collection('weights').where('date', "==", startToday).get()
  let payload: UserWeightType

  try {
    await userRef.then(snap => {
      if (!snap.empty) {
        snap.forEach(doc => {
          doc.ref.update({ weight: weight, updatedAt: currentTime })
        })
        const weightObj: UserWeightType = {
          uid: currentUserId,
          date: startToday,
          weight: weight,
          createdAt: convertFirebaseTimeStamp(new Date),
          updatedAt: convertFirebaseTimeStamp(new Date)
        }
        payload = weightObj
      } else {
        const userRef = db.collection('users').doc(currentUserId).collection('weights')
        userRef.add({ 
          weight: weight, 
          date: startToday, 
          uid: currentUserId,
          createdAt: currentTime,
          updatedAt: currentTime
        })
        const weightObj: UserWeightType = {
          weight: weight,
          date: startToday,
          uid: currentUserId,
          createdAt: convertFirebaseTimeStamp(new Date),
          updatedAt: convertFirebaseTimeStamp(new Date)
        }
        payload = weightObj
      }
    })
    return { paload: payload }
  } catch(error) {
    return { error: error }
  }
}

export const requestFetchGetChartSetting = async () => {
  const currentUserId = firebase.auth().currentUser.uid
  const settingRef = db.collection('users').doc(currentUserId).collection('settings').get()
  let settingArry: ResponseChartSettingType[] = []
  try {
    await settingRef.then(snap => {
      snap.forEach(doc => {
        const data = doc.data() as ResponseChartSettingType
        settingArry.push(data)
      })
    })
    return { payload: settingArry[0] }
  } catch(error) {
    return { error: error }
  }
}

export const requestFetchPostChartSetting = async (settings: RequestChartSettingType) => {
  const { weightGoal } = settings
  const currentUserId = firebase.auth().currentUser.uid

  const settingRef = db.collection('users').doc(currentUserId).collection('settings')
  const settingObj: ResponseChartSettingType = {
    uid: currentUserId,
    weightGoal: weightGoal,
    createdAt: convertFirebaseTimeStamp(new Date),
    updatedAt: convertFirebaseTimeStamp(new Date)
  }

  try {
    await settingRef.add(settingObj)
    return { payload: settingObj }
  } catch(error) {
    return { error: error }
  }
}
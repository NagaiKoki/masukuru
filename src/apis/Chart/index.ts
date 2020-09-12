import firebase, { db } from '../../config/firebase'
// import types
import { UserWeightType } from '../../types/Chart'
// import utils 
import { getDayOfStortToday, convertFirebaseTimeStamp, getLastWeekDay, getMidnightTime } from '../../utilities/timestamp'

export const requestFetchWeights = async (date: Date) => {
  const currentUserId = firebase.auth().currentUser.uid
  const endDate = getMidnightTime(date) // 引数の日の正子を取得する
  const startDate = getLastWeekDay(endDate)

  console.log(`startDate: ${startDate}`)
  console.log(`endDate: ${endDate}`)

  const userRef = db.collection('users').doc(currentUserId).collection('weights').where('date', '>=', startDate).where('date', '<=', endDate).get()

  let weights: UserWeightType[] = []
  try {
    await userRef.then(snap => {
      console.log(snap.size)
      snap.forEach(doc => {
        const data = doc.data() as UserWeightType
        weights.push(data)
      })
    })
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
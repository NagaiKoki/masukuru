import firebase, { db } from '../../config/firebase'
// import types
import { UserWeightType } from '../../types/Chart'
// import utils 
import { getDayOfStortToday, convertFirebaseTimeStamp } from '../../utilities/timestamp'

export const requestFetchWeights = async () => {
  const currentUserId = firebase.auth().currentUser.uid
  const userRef = db.collection('users').doc(currentUserId).collection('weights').get()
  let weights: UserWeightType[]
  try {
    await userRef.then(snap => {
      snap.forEach(doc => {
        const data = doc.data() as UserWeightType
        weights.push(data)
      })
    })

    return { payload: weights }
  } catch(error) {
    return { error: error }
  }
}

export const requestPostWeight = async (weight: number, date: Date) => {
  const currentUserId = firebase.auth().currentUser.uid
  const currentTime = firebase.firestore.FieldValue.serverTimestamp()
  const startToday = convertFirebaseTimeStamp(getDayOfStortToday(date))

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
          date: getDayOfStortToday(date),
          weight: weight,
          createdAt: new Date,
          updatedAt: new Date
        }
        payload = weightObj
      } else {
        const userRef = db.collection('users').doc(currentUserId).collection('weights')
        userRef.add({ 
          weight: weight, 
          date: getDayOfStortToday(date), 
          uid: currentUserId,
          createdAt: currentTime,
          updatedAt: currentTime
        })
        const weightObj: UserWeightType = {
          weight: weight,
          date: date,
          uid: currentUserId,
          createdAt: new Date,
          updatedAt: new Date
        }
        payload = weightObj
      }
    })
    return { paload: payload }
  } catch(error) {
    return { error: error }
  }
}
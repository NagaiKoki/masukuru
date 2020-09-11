import firebase, { db } from '../../config/firebase'
import { convertTimeStampToStringOnlyDate } from '../../utilities/timestamp'
// import types
import { UserWeightType } from '../../types/Chart'

export const requestPostWeight = async (weight: number, date: Date) => {
  const currentUserId = firebase.auth().currentUser.uid
  const currentTime = firebase.firestore.FieldValue.serverTimestamp()
  const onlyDate = convertTimeStampToStringOnlyDate(undefined, date)
  const firebaseTimstamp = firebase.firestore.Timestamp.fromDate(new Date(onlyDate))
  const userRef = db.collection('users').doc(currentUserId).collection('weights').where('date', '==', firebaseTimstamp).get()
  let payload: UserWeightType

  try {
    await userRef.then(snap => {
      if (!snap.empty) {
        snap.forEach(doc => {
          doc.ref.update({ weight: weight, updatedAt: currentTime })
        })
        const weightObj: UserWeightType = {
          uid: currentUserId,
          date: date,
          weight: weight,
          createdAt: new Date,
          updatedAt: new Date
        }
        payload = weightObj
      } else {
        const userRef = db.collection('users').doc(currentUserId).collection('weights')
        userRef.add({ 
          weight: weight, 
          date: date, 
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
    console.log(error)
    return { error: error }
  }
}
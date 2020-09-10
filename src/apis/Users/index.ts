import firebase, { db } from '../../config/firebase'
import { convertTimeStampToStringOnlyDate } from '../../utilities/timestamp'
// import types
import { UserWeightType } from '../../types/Chart'

export const requestFetchUser = async (uid: string) => {
  let user;
  const userRef = db.collection('users').doc(uid)
  try {
    await userRef.get().then(snap => {
      if (!snap.exists) {
        throw new Error('no data')
      } else {
        user = snap.data()
      }
    })
    return { user: user }
  } catch (error) {
    return { error: error }
  }
}

export const requestUpdateUser = async (name: string, imageUrl: string, user: firebase.User) => {
  const uid = user.uid
  const userRef = db.collection('users').doc(uid)
  const groupUserRef = db.collectionGroup('groupUsers').where('uid', '==', uid)
  let batch = db.batch()
  try {
    await user.updateProfile({ displayName: name, photoURL: imageUrl })
    await batch.update(userRef, { imageUrl: imageUrl, name: name })
    await groupUserRef.get().then(snap => {
      snap.forEach(doc => {
        console.log(doc.data())
        batch.update(doc.ref, {
          name: name, 
          imageUrl: imageUrl
        })
      })
    })
    batch.commit()

    return { payload: 'success' }
  } catch(error) {
    return { error: error }
  }
}

export const requestPostWeight = async (weight: number, date: Date) => {
  const currentUserId = firebase.auth().currentUser.uid
  const currentTime = firebase.firestore.FieldValue.serverTimestamp()
  const onlyDate = convertTimeStampToStringOnlyDate(undefined, date)
  const firebaseTimstamp = firebase.firestore.Timestamp.fromDate(new Date(onlyDate))
  const userRef = db.collection('users').doc(currentUserId).collection('weights').where('date', '==', firebaseTimstamp).get()

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
        return { payload: weightObj }
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
        return { payload: weightObj }
      }
    })
  } catch {

  }
}
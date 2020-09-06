import { db } from '../../config/firebase'

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
import firebase, { db } from '../../config/firebase'

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
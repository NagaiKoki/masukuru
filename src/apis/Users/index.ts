import firebase, { db } from '../../config/firebase'
import { UserType } from '../../types/User';

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
    return { user }
  } catch (error) {
    return { error }
  }
}

export const requestFetchUsers = async (userIds: string[]) => {
  const userRef = db.collection('users')
  const uids: UserType[] = []

  try {
    await Promise.all(userIds.map(async uid => {
      await userRef.doc(uid).get().then(snap => {
        const data = snap.data() as UserType
        uids.push(data)
      })
    }))
    return { payload: uids }
  } catch(error) {
    return { error }
  }
}

// 今後使わない
export const requestUpdateUser = async (name: string, imageUrl: string, user: firebase.User) => {
  const uid = user.uid
  const userRef = db.collection('users').doc(uid)
  const groupUserRef = db.collectionGroup('groupUsers').where('uid', '==', uid)
  let batch = db.batch()
  try {
    await user.updateProfile({ displayName: name, photoURL: imageUrl })
    await batch.update(userRef, { imageUrl, name })
    await groupUserRef.get().then(snap => {
      snap.forEach(doc => {
        batch.update(doc.ref, {
          name, 
          imageUrl
        })
      })
    })
    await batch.commit()

    return { payload: 'success' }
  } catch(error) {
    return { error }
  }
}

// 今後使用する
export const requestFetchUpdateUser = async (currentUser: UserType) => {
  const firebaseUser = firebase.auth().currentUser
  const userRef = db.collection('users').doc(firebaseUser.uid)
  const groupUserRef = db.collectionGroup('groupUsers').where('uid', '==', firebaseUser.uid)
  const { name, imageUrl } = currentUser
  let batch = db.batch()

  try {
    await firebaseUser.updateProfile({ displayName: name, photoURL: imageUrl })
    batch.update(userRef, { ...currentUser })
    await groupUserRef.get().then(snap => {
      snap.forEach(doc => {
        batch.update(doc.ref, { ...currentUser })
      })
    })

    await batch.commit()
    return { payload: 'success' }
  } catch(error) {
    return { error }
  }
}
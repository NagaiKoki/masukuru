import { Platform } from 'react-native'
import * as StoreReview from 'expo-store-review';
import firebase, { db } from '../config/firebase'

export const requestAppReview = async () => {
  await db.collection('users').doc(firebase.auth().currentUser.uid).get().then( async snap => {
    if (Platform.OS === 'ios' && StoreReview.isAvailableAsync() && (!snap.data().isReviewed || !snap.data().isCommentReview)) {
      await StoreReview.requestReview()
      await snap.ref.update({ isReviewed: true })
    }
  })
}
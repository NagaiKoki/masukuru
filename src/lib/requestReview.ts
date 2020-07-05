import * as StoreReview from 'expo-store-review';
import firebase, { db } from '../config/firebase'

export const requestAppReview = async () => {
  await db.collection('users').doc(firebase.auth().currentUser.uid).get().then( async snap => {
    if (StoreReview.isAvailableAsync() && !snap.data().isReviewed) {
      await StoreReview.requestReview();
      await snap.ref.update({ isReviewed: true })
    }
  })
}
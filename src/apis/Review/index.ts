import firebase, { db } from '../../config/firebase'
// import constants
import { COMMON_ERROR_MESSSAGE } from '../../constants/errorMessage'

export const requestPatchApplausedReviewed = async () => {
  const currentUserId = firebase.auth().currentUser.uid
  const userRef = db.collection('users').doc(currentUserId)

  try {
    await userRef.update({ isApplausedReviewed: true })
    return { payload: 'success' }
  } catch {
    return { error: COMMON_ERROR_MESSSAGE.TRY_AGAIN }
  }
}
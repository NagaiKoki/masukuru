import { useState } from 'react'
// import config
import firebase from '../../config/firebase'
// import types
import { UserStatusType } from '../../types/auth'

export const useUserStatus = () => {
  const [status, setStatus] = useState<UserStatusType>('')
  firebase.auth().onAuthStateChanged(user => {
    if (user && user.displayName) {
      return setStatus('authorized')
    } else if (user && !user.displayName) {
      return setStatus('tutorial')
    } else {
      return setStatus('unauthorized')
    }
  })
  return status
}
// import actionTypes
import { 
  REQUEST_FETCH_USER_DATA,
  SUCCESS_FETCH_USER_DATA,
  FAILURE_FETCH_USER_DATA
} from '../actionTypes'
// import types
import { 
  UserActionTypes,
  UserType
} from '../../types/User'

export const requestFetchUserData = (uid: string): UserActionTypes => {
  return {
    type: REQUEST_FETCH_USER_DATA,
    uid
  }
}

export const successFetchUserData = (payload: UserType): UserActionTypes => {
  return {
    type: SUCCESS_FETCH_USER_DATA,
    payload
  }
}

export const failureFetchUserData = (error: string): UserActionTypes => {
  return {
    type: FAILURE_FETCH_USER_DATA,
    error
  }
}
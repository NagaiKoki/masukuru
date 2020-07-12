// import action types
import { 
  REQUEST_FETCH_USER_DATA,
  SUCCESS_FETCH_USER_DATA, 
  FAILURE_FETCH_USER_DATA
} from '../../actions/actionTypes'

export type GroupUserType = {
  currentGroupId: string
  imageUrl: string
  name: string
  uid: string
}

export type UserType = {
  uid: string
  name: string
  sex: string
  age: string | null
  height: string | null
  imageUrl: string | null
  weight: string | null
}

export interface RequestFetchUserData {
  type: typeof REQUEST_FETCH_USER_DATA
}

export interface SuccessFetchUserData {
  type: typeof SUCCESS_FETCH_USER_DATA
  payload: UserType
}

export interface FailureFetchUserData {
  type: typeof FAILURE_FETCH_USER_DATA
  error: string
}

export type UserActionTypes =
RequestFetchUserData |
SuccessFetchUserData |
FailureFetchUserData
// import action types
import { 
  REQUEST_FETCH_GROUP_USERS,
  SUCCESS_FETCH_GROUP_USERS,
  FAILURE_FETCH_GROUP_USERS,
  SET_CURRENT_GROUP_ID
} from '../../actions/actionTypes'
// import types
import { 
  GroupUserType
} from '../user'

// state
export interface GroupState {
  currentGroupid: string
}

// 所属グループIDの設定
export interface SetCurrentGroupId {
  type: typeof SET_CURRENT_GROUP_ID
  id: string
}

// グループユーザーの取得リクエスト
export interface RequestFetchGroupUsers {
  type: typeof REQUEST_FETCH_GROUP_USERS
}

// グループユーザーの取得リクエスト成功
export interface SuccessFetchGroupUsers {
  type: typeof SUCCESS_FETCH_GROUP_USERS
  payload: GroupUserType[]
}

// グループユーザーの取得リクエスト失敗
export interface FailureFetchGroupUsers {
  type: typeof FAILURE_FETCH_GROUP_USERS
  error: string
}

export type GroupActionTypes = 
  | SetCurrentGroupId
  | RequestFetchGroupUsers
  | SuccessFetchGroupUsers
  | FailureFetchGroupUsers
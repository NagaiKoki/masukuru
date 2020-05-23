// import action types
import {
  SET_CURRENT_GROUP_ID,
  REQUEST_FETCH_GROUP_USERS,
  SUCCESS_FETCH_GROUP_USERS,
  FAILURE_FETCH_GROUP_USERS
} from '../actionTypes'
// import types
import {
  GroupActionTypes,
  SetCurrentGroupId
} from '../../types/Group'

export const setCurrentGroupId = (id: string): GroupActionTypes => {
  return {
    type: SET_CURRENT_GROUP_ID,
    id
  }
}
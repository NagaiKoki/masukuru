// import actionTypes
import { ADD_RECORD, DELETE_RECORD } from './actionTypes'
// import types
import { RecordActionTypes } from '../types/Record'

// 記録の削除
export const addRecord = (): RecordActionTypes => {
  return {
    type: ADD_RECORD
  }
}

// 記録の削除
export const deleteRecord = (): RecordActionTypes => {
  return {
    type: DELETE_RECORD
  }
}
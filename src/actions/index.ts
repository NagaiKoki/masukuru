// import actionTypes
import { ADD_RECORD, DELETE_RECORD, ON_CHANGE_TRAINING_NAME } from './actionTypes'
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

// 種目の文字検知
export const onChangeTrainingName = (name: string): RecordActionTypes => {
  return {
    type: ON_CHANGE_TRAINING_NAME,
    name
  }
}
// import actionTypes
import { 
  ADD_RECORD, 
  DELETE_RECORD, 
  ON_CHANGE_TRAINING_NAME, 
  SET_RECORD_ERROR,
} from './actionTypes'
// import types
import { RecordActionTypes, RecordItemType } from '../types/Record'

// 記録の追加
export const addRecord = (record: RecordItemType): RecordActionTypes => {
  return {
    type: ADD_RECORD,
    record
  }
}

// 記録の削除
export const deleteRecord = (record: RecordItemType): RecordActionTypes => {
  return {
    type: DELETE_RECORD,
    record
  }
}

// エラーのセット
export const setRecordError = (error: string): RecordActionTypes => {
  return {
    type: SET_RECORD_ERROR,
    error
  }
}

// 種目の文字検知
export const onChangeTrainingName = (name: string): RecordActionTypes => {
  return {
    type: ON_CHANGE_TRAINING_NAME,
    name
  }
}
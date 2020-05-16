// import actionTypes
import { 
  ADD_RECORD, 
  DELETE_RECORD, 
  ON_CHANGE_TRAINING_NAME, 
  SET_RECORD_ERROR,
  UPDATE_RECORD,
  ON_CHANGE_DISTANCE,
  ON_CHANGE_TIME,
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

// 記録の更新
export const updateRecord = (record: RecordItemType): RecordActionTypes => {
  return {
    type: UPDATE_RECORD,
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

// 距離の検知
export const onChangeDistance = (payload: number): RecordActionTypes => {
  return {
    type: ON_CHANGE_DISTANCE,
    payload
  }
}

// 時間の検知
export const onChangeTime = (payload: number): RecordActionTypes => {
  return {
    type: ON_CHANGE_TIME,
    payload
  }
}
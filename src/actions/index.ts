// import actionTypes
import { 
  ADD_RECORD, 
  DELETE_RECORD, 
  ON_CHANGE_TRAINING_NAME, 
  SET_RECORD_ERROR,
  UPDATE_RECORD,
  ON_CHANGE_DISTANCE,
  ON_CHANGE_TIME,
  ON_CHANGE_WORD,
  REQUEST_SUBMIT_RECORDS,
  SUCCESS_SUBMIT_RECORDS,
  FAILURE_SUBMIT_RECORDS,
  REQUEST_FETCH_RECORDS,
  SUCCESS_FETCH_RECORDS,
  FAILURE_FETCH_RECORDS,
  REQUEST_NEXT_RECORDS,
  SUCCESS_FETCH_NEXT_RECORDS,
  FAILURE_FETCH_NEXT_RECORDS,
} from './actionTypes'
// import types
import { RecordActionTypes, RecordItemType, ResponseRecordType } from '../types/Record'

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

// つぶやきの検知
export const onChangeWord = (payload: string): RecordActionTypes => {
  return {
    type: ON_CHANGE_WORD,
    payload
  }
}

// レコードの保存リクエスト
export const requestSubmitRecords = (records: RecordItemType[], word: string): RecordActionTypes => {
  return {
    type: REQUEST_SUBMIT_RECORDS,
    records,
    word
  }
}

// レコードの保存成功
export const successSubmitRecords = (): RecordActionTypes => {
  return {
    type: SUCCESS_SUBMIT_RECORDS
  }
}

// レコードの保存失敗
export const failureSubmitRecords = (error: string): RecordActionTypes => {
  return {
    type: FAILURE_SUBMIT_RECORDS,
    error
  }
}

// 記録の取得
export const requestFetchRecords = (uid?: string): RecordActionTypes => {
  return {
    type: REQUEST_FETCH_RECORDS,
    uid
  }
}

// 記録の取得成功
export const SuccessFetchRecords = (payload: ResponseRecordType[]): RecordActionTypes => {
  return {
    type: SUCCESS_FETCH_RECORDS,
    payload
  }
}

// 記録の取得失敗
export const failureFetchRecords = (error: string): RecordActionTypes => {
  return {
    type: FAILURE_FETCH_RECORDS,
    error
  }
}

// 記録の追加読み込みリクエスト
export const requestNextRecords = (uid?: string, lastRecord?: ResponseRecordType): RecordActionTypes => {
  return {
    type: REQUEST_NEXT_RECORDS,
    uid,
    lastRecord
  }
}

// 記録の追加読み込みリクエスト成功
export const successFetchNextRecords = (payload: ResponseRecordType[]): RecordActionTypes => {
  return {
    type: SUCCESS_FETCH_NEXT_RECORDS,
    payload
  }
}

// 記録の追加読み込みリクエスト失敗
export const failureFetchNextRecords = (error: string): RecordActionTypes => {
  return {
    type: FAILURE_FETCH_NEXT_RECORDS,
    error
  }
}
type FirestoreTimestamp = import("firebase").firestore.Timestamp;

// import
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
} from '../../actions/actionTypes'

export interface RecordState {
  recordItems: RecordItemType[]
  word: string
  temporaryName: string
  temporaryTime: string
  temporaryDistance: string
  temporaryamounts: number[]
  temporaryWeights: number[]
  error: string,
  isLoading: boolean,
  recordData: ResponseRecordType[]
  userRecords: ResponseRecordType[]
}

export type RecordItemType = RecordMuscleItemType | RecordAeroItemType

export type RecordMuscleItemType = {
  id: number
  name: string
  set: number
  amounts: number[]
  weights: number[]
  isMuscle: true
}

export type RecordAeroItemType = {
  id: number
  name: string
  time: number
  distance: number
  isMuscle: false
}

export type ResponseRecordType = {
  id: string
  records: RecordItemType[]
  word: string
  uid: string
  createdAt: FirestoreTimestamp
  updatedAt: FirestoreTimestamp
}

// 記録の追加
export interface AddRecord {
  type: typeof ADD_RECORD
  record: RecordItemType | RecordAeroItemType
}

// 記録の削除
export interface DeleteRecord {
  type: typeof DELETE_RECORD
  record: RecordItemType | RecordAeroItemType
}

// 記録の更新
export interface UpdateRecord {
  type: typeof UPDATE_RECORD
  record: RecordItemType | RecordAeroItemType
}

// エラーのセット
export interface SetRecordError {
  type: typeof SET_RECORD_ERROR
  error: string
}

// 種目名の検知
export interface OnChangeTrainingName {
  type: typeof ON_CHANGE_TRAINING_NAME
  name: string
}

// 距離の検知
export interface OnChangeDistance {
  type: typeof ON_CHANGE_DISTANCE
  payload: string
}
// 時間の検知
export interface OnChangeTime {
  type: typeof ON_CHANGE_TIME
  payload: string
}

// つぶやきの検知
export interface OnChangeWord {
  type: typeof ON_CHANGE_WORD
  payload: string
}

// 記録の保存リクエスト
export interface RequestSubmitRecords {
  type: typeof REQUEST_SUBMIT_RECORDS
  records: RecordItemType[]
  word: string
}

// 記録の保存成功
export interface SuccessSubmitRecords {
  type: typeof SUCCESS_SUBMIT_RECORDS
}

// 記録の保存失敗
export interface FailureSubmitRecords {
  type: typeof FAILURE_SUBMIT_RECORDS
  error: string
}

// 記録の取得
export interface RequestFetchRecords {
  type: typeof REQUEST_FETCH_RECORDS
  uid?: string
  groupId?: string
}

// 記録の成功
export interface SuccessFetchRecords {
  type: typeof SUCCESS_FETCH_RECORDS
  payload: ResponseRecordType[]
  uid?: string
  groupId?: string
}

// 記録の失敗
export interface FailureFetchRecords {
  type: typeof FAILURE_FETCH_RECORDS
  error: string
}

// 記録の追加読み込み
export interface RequestNextRecords {
  type: typeof REQUEST_NEXT_RECORDS
  uid?: string
  groupId?: string
  lastRecord: ResponseRecordType
}

// 記録の追加読み込み成功
export interface SuccessFetchNextRecords {
  type: typeof SUCCESS_FETCH_NEXT_RECORDS
  payload: ResponseRecordType[]
  uid?: string
  groupId?: string
}

// 記録の追加読み込み失敗
export interface FailureFetchNextRecords {
  type: typeof FAILURE_FETCH_NEXT_RECORDS
  error: string
}

export type RecordActionTypes =
  AddRecord |
  DeleteRecord |
  UpdateRecord |
  OnChangeTrainingName |
  SetRecordError |
  OnChangeDistance |
  OnChangeTime |
  OnChangeWord |
  RequestSubmitRecords |
  SuccessSubmitRecords |
  FailureSubmitRecords |
  RequestFetchRecords |
  SuccessFetchRecords |
  FailureFetchRecords |
  RequestNextRecords |
  SuccessFetchNextRecords |
  FailureFetchNextRecords
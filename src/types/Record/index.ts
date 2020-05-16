// import
import { 
  ADD_RECORD, 
  DELETE_RECORD, 
  ON_CHANGE_TRAINING_NAME, 
  SET_RECORD_ERROR,
  UPDATE_RECORD,
  ON_CHANGE_DISTANCE,
  ON_CHANGE_TIME,
} from '../../actions/actionTypes'

export interface RecordState {
  recordItems: RecordItemType[]
  temporaryName: string
  temporaryTime: number
  temporaryDistance: number
  temporaryamounts: number[]
  temporaryWeights: number[]
  error: string
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
  payload: number
}
// 時間の検知
export interface OnChangeTime {
  type: typeof ON_CHANGE_TIME
  payload: number
}

export type RecordActionTypes =
  AddRecord |
  DeleteRecord |
  UpdateRecord |
  OnChangeTrainingName |
  SetRecordError |
  OnChangeDistance |
  OnChangeTime
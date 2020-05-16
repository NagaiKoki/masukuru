// import
import { 
  ADD_RECORD, 
  DELETE_RECORD, 
  ON_CHANGE_TRAINING_NAME, 
  SET_RECORD_ERROR,
  UPDATE_RECORD,
} from '../../actions/actionTypes'

export interface RecordState {
  recordItems: RecordItemType[]
  temporaryName: string
  temporaryamounts: number[]
  temporaryWeights: number[]
  error: string
}

export type RecordItemType = {
  id: number
  name: string
  set: number
  amounts: number[]
  weights: number[]
}

// 記録の追加
export interface AddRecord {
  type: typeof ADD_RECORD
  record: RecordItemType
}

// 記録の削除
export interface DeleteRecord {
  type: typeof DELETE_RECORD
  record: RecordItemType
}

// 記録の追加
export interface UpdateRecord {
  type: typeof UPDATE_RECORD
  record: RecordItemType
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

export type RecordActionTypes =
  AddRecord |
  DeleteRecord |
  UpdateRecord |
  OnChangeTrainingName |
  SetRecordError
  



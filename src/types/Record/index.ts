// import
import { 
  ADD_RECORD, 
  DELETE_RECORD, 
  ON_CHANGE_TRAINING_NAME, 
  ON_CHANG_SET_COUNT 
} from '../../actions/actionTypes'

export interface RecordState {
  recordItems: RecordItemType[]
  temporaryName: string
  temporarySet: number
  temporaryamounts: number[]
  temporaryWeights: number[]
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
}

// 記録の削除
export interface DeleteRecord {
  type: typeof DELETE_RECORD
}

// 種目名の検知
export interface OnChangeTrainingName {
  type: typeof ON_CHANGE_TRAINING_NAME
  name: string
}

// セット数の検知
export interface OnChangeSetCount {
  type: typeof ON_CHANG_SET_COUNT
  payload: number
}

export type RecordActionTypes =
  AddRecord |
  DeleteRecord |
  OnChangeTrainingName |
  OnChangeSetCount


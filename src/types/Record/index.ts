// import
import { ADD_RECORD, DELETE_RECORD, ON_CHANGE_TRAINING_NAME } from '../../actions/actionTypes'

export interface RecordState {
  recordItems: RecordItemType[]
  trainingName: string
}

export type RecordItemType = {
  name: string
  set: number
  amounsts: number[]
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

export type RecordActionTypes =
  AddRecord |
  DeleteRecord |
  OnChangeTrainingName


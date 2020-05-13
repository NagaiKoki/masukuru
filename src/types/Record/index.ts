// import
import { ADD_RECORD, DELETE_RECORD } from '../../actions/actionTypes'

export interface RecordState {
  records: []
}

// 記録の追加
export interface AddRecord {
  type: typeof ADD_RECORD
}

// 記録の削除
export interface DeleteRecord {
  type: typeof DELETE_RECORD
}

export type RecordActionTypes =
  AddRecord |
  DeleteRecord


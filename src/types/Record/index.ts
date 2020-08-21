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
  INITIALIZE_RECORDS,
  REQUEST_DESTORY_RECORD,
  SUCCESS_DESTROY_RECORD,
  FAILURE_DESTROY_RECORD,
  CHANGE_RECORD_COMMENT_TEXT,
  REQUEST_POST_RECORD_COMMENT,
  SUCCESS_POST_RECORD_COMMENT,
  FAILURE_POST_RECORD_COMMENT,
  REQUEST_FETCH_RECORD_COMMENTS,
  SUCCESS_FETCH_RECORD_COMMENTS,
  FAILURE_FETCH_RECORD_COMMENTS,
  REQUEST_DELETE_RECORD_COMMENT,
  SUCCESS_DELETE_RECORD_COMMENT,
  FAILURE_DELETE_RECORD_COMMENT,
  ON_CHANGE_RECORD_DATE
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
  beforeRecordSize: number
  userRecords: ResponseRecordType[]
  beforeUserRecordSize: number
  temporaryComment: string
  commentPostError: string
  comments: RecordCommentType[]
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

export type RecordCommentType = {
  id: string
  recordId: string
  uid: string
  content: string
  groupId: string
  createdAt: FirestoreTimestamp | Date
  updatedAt: FirestoreTimestamp | Date
}

// 記録の作成 ////////////////////////////////////////////////////////////
// 記録の追加
export interface AddRecord {
  type: typeof ADD_RECORD
  record: RecordItemType | RecordAeroItemType
}

// 記録の削除(state)
export interface DeleteRecord {
  type: typeof DELETE_RECORD
  record: RecordItemType | RecordAeroItemType
}

// 記録の削除(firestore)
export interface RequestDestroyRecord {
  type: typeof REQUEST_DESTORY_RECORD
  id: string
}

// 記録の削除成功(firestore)
export interface SuccessDestroyRecord {
  type: typeof SUCCESS_DESTROY_RECORD
  id: string
}

// 記録の削除失敗(firestore)
export interface FailureDestroyRecord {
  type: typeof FAILURE_DESTROY_RECORD,
  error: string
}

// 記録の初期化
export interface InitializeRecord {
  type: typeof INITIALIZE_RECORDS
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

// トレーニング日検知
export interface OnChangeRecordDate {
  type: typeof ON_CHANGE_RECORD_DATE
  date: Date
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

// 記録の取得 ////////////////////////////////////////////////////////////
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

// 記録へのリアクション ////////////////////////////////////////////////////////////
// コメント入力検知
export interface ChangeRecordCommentText {
  type: typeof CHANGE_RECORD_COMMENT_TEXT
  text: string
}

// コメントの送信
export interface RequestPostRecordComment {
  type: typeof REQUEST_POST_RECORD_COMMENT
  recordId: string
  recordUserId: string 
  notificationGroupId?: string
}

// コメントの送信成功
export interface SuccessPostRecordComment {
  type: typeof SUCCESS_POST_RECORD_COMMENT
  payload: RecordCommentType
}

// コメントの送信失敗
export interface FailurePostRecordComment {
  type: typeof FAILURE_POST_RECORD_COMMENT
  error: string
}

// 記録のコメント取得
export interface RequestFetchRecordComments {
  type: typeof REQUEST_FETCH_RECORD_COMMENTS
  recordId: string
}

// 記録のコメント取得成功
export interface SuccessFetchRecordComments {
  type: typeof SUCCESS_FETCH_RECORD_COMMENTS
  payload: RecordCommentType[]
}

// 記録のコメント取得失敗
export interface FailureFetchRecordComments {
  type: typeof FAILURE_FETCH_RECORD_COMMENTS
  error: string
}

// コメントの削除リクエスト
export interface RequestDeleteRecordComment {
  type: typeof REQUEST_DELETE_RECORD_COMMENT
  recordId: string
  commentId: string
}

// コメントの削除成功
export interface SuccessDeleteRecordComment {
  type: typeof SUCCESS_DELETE_RECORD_COMMENT
  id: string
}

// コメントの削除失敗
export interface FailureDeleteRecordComment {
  type: typeof FAILURE_DELETE_RECORD_COMMENT
  error: string
}


export type RecordActionTypes =
  AddRecord |
  DeleteRecord |
  RequestDestroyRecord |
  SuccessDestroyRecord |
  FailureDestroyRecord |
  InitializeRecord |
  UpdateRecord |
  OnChangeTrainingName |
  SetRecordError |
  OnChangeDistance |
  OnChangeTime |
  OnChangeWord |
  OnChangeRecordDate |
  RequestSubmitRecords |
  SuccessSubmitRecords |
  FailureSubmitRecords |
  RequestFetchRecords |
  SuccessFetchRecords |
  FailureFetchRecords |
  RequestNextRecords |
  SuccessFetchNextRecords |
  FailureFetchNextRecords |
  ChangeRecordCommentText |
  RequestPostRecordComment |
  SuccessPostRecordComment |
  FailurePostRecordComment |
  RequestFetchRecordComments |
  SuccessFetchRecordComments |
  FailureFetchRecordComments |
  RequestDeleteRecordComment |
  SuccessDeleteRecordComment |
  FailureDeleteRecordComment
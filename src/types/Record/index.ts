export type FirestoreTimestamp = import("firebase").firestore.Timestamp;

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

// export interface RecordState {
//   recordItems: RecordItemType[]
//   word: string
//   trainingDate: Date
//   imageUrl: string
//   temporaryName: string
//   temporaryTime: string
//   temporaryDistance: string
//   temporaryamounts: number[]
//   temporaryWeights: number[]
//   error: string,
//   isLoading: boolean,
//   recordData: ResponseRecordType[]
//   beforeRecordSize: number
//   userRecords: ResponseRecordType[]
//   beforeUserRecordSize: number
//   temporaryComment: string
//   commentPostError: string
//   comments: RecordCommentType[]
// }

export interface RecordState {
  recordItems: RecordItemType[]
  trainingDate: Date
  word: string
  imageUrl: string
  error: string
  isLoading: boolean
  recordData: ResponseRecordType[]
  beforeRecordSize: number
  userRecords: ResponseRecordType[]
  beforeUserRecordSize: number
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
  trainingDate: FirestoreTimestamp | null
  uid: string
  imageUrl: string
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

export type WeightType = number | string

export type AmountType = number | string

export type SuccessFetchRecordType = {
  payload: ResponseRecordType[]
  uid?: string
  groupId?: string
}

export type RequestFetchRecordType = {
  uid: string
  groupId: string
}
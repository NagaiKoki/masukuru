// import action types
import {
  REQUEST_FETCH_SUGGEST_RECORDS,
  SUCCESS_FETCH_SUGGEST_RECORDS,
  FAILURE_FETCH_SUGGEST_RECORDS
} from '../../../actions/actionTypes'

type FirestoreTimestamp = import("firebase").firestore.Timestamp;

export type SuggestRecordType = {
  name: string
  times: number
  createdAt: FirestoreTimestamp | Date
  updatedAt: FirestoreTimestamp | Date
}

export interface RequestFetchSuggestRecords {
  type: typeof REQUEST_FETCH_SUGGEST_RECORDS
  name?: string
}

export interface SuccessFetchSuggestRecords {
  type: typeof SUCCESS_FETCH_SUGGEST_RECORDS
  payload: string[]
}

export interface FailureFetchSuggestRecords {
  type: typeof FAILURE_FETCH_SUGGEST_RECORDS
  error: string
}
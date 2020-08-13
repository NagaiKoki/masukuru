// import ation types
import {
  REQUEST_FETCH_SUGGEST_RECORDS,
  SUCCESS_FETCH_SUGGEST_RECORDS,
  FAILURE_FETCH_SUGGEST_RECORDS
} from '../actionTypes'
// import types
import { SuggestRecordActionTypes } from '../../types/Search/Record/suggest'

export const requestFetchSuggestRecords = (name?: string): SuggestRecordActionTypes => {
  return {
    type: REQUEST_FETCH_SUGGEST_RECORDS,
    name
  }
}

export const successFetchSuggestRecords = (payload: string[]): SuggestRecordActionTypes => {
  return {
    type: SUCCESS_FETCH_SUGGEST_RECORDS,
    payload
  }
}

export const failureFetchSuggestRecords = (error: string): SuggestRecordActionTypes => {
  return {
    type: FAILURE_FETCH_SUGGEST_RECORDS,
    error
  }
}
import { fork, call, put, takeEvery } from 'redux-saga/effects'
// import apis
import { requestFetchSuggestRecord } from '../apis/Search/Records/suggest'
// import action types 
import {
  REQUEST_FETCH_SUGGEST_RECORDS,
} from '../actions/actionTypes'
// import action types
import { 
  RequestFetchSuggestRecords 
} from '../types/Search/Record/suggest'
// import actions
import {
  successFetchSuggestRecords,
  failureFetchSuggestRecords
} from '../actions/Search/suggestRecord'
// import lazy
import { createLazily } from '.'

function* runRequestFetchSuggestRecords (action: RequestFetchSuggestRecords) {
  const { name } = action
  const { payload, error }: { payload?: string[], error?: string } = yield call(
    requestFetchSuggestRecord,
    name
  )

  if (payload && !error) {
    yield put(successFetchSuggestRecords(payload))
  } else {
    yield put(failureFetchSuggestRecords(error))
  }
}

function* handleRequestFetchSuggestRecords () {
  const lazily = createLazily(400)
  yield takeEvery(REQUEST_FETCH_SUGGEST_RECORDS, lazily, runRequestFetchSuggestRecords)
}

export default function* suggestRecord () {
  fork(handleRequestFetchSuggestRecords)
}
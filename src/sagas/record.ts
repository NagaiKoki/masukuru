import { fork, takeEvery, call, put } from 'redux-saga/effects'
// import actions
import { 
  REQUEST_SUBMIT_RECORDS, 
  SUCCESS_SUBMIT_RECORDS, 
  FAILURE_SUBMIT_RECORDS 
} from '../actions/actionTypes'
// import types
import { RequestSubmitRecords } from '../types/Record'
// import apis
import { requestPostRecords } from '../apis/Records'
import { successSubmitRecords, failureSubmitRecords } from '../actions'

function* runRequestSubmitRecords(action: RequestSubmitRecords) {
  const { records, word } = action
  const { payload, error }: { payload?: string, error?: string } = yield call(
    requestPostRecords,
    records,
    word
  )

  if (payload && !error) {
    yield put(successSubmitRecords())
  } else {
    yield put(failureSubmitRecords(error))
  }
}

function* handleRequestSubmitRecords() {
  yield takeEvery(REQUEST_SUBMIT_RECORDS, runRequestSubmitRecords)
}

export default function* recordSaga() {
  yield fork(handleRequestSubmitRecords)
}
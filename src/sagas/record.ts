import { fork, takeEvery } from 'redux-saga/effects'
// import actions
import { 
  REQUEST_SUBMIT_RECORDS, 
  SUCCESS_SUBMIT_RECORDS, 
  FAILURE_SUBMIT_RECORDS 
} from '../actions/actionTypes'
// import types
import { RequestSubmitRecords } from '../types/Record'

function* runRequestSubmitRecords(action: RequestSubmitRecords) {
  const { payload, word } = action

}

function* handleRequestSubmitRecords() {
  yield takeEvery(REQUEST_SUBMIT_RECORDS, runRequestSubmitRecords)
}

export default function* recordSaga() {
  yield fork(handleRequestSubmitRecords)
}
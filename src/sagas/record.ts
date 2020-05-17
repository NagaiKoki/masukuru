import { fork, takeEvery, call, put, delay } from 'redux-saga/effects'
// import actions
import { 
  REQUEST_SUBMIT_RECORDS, 
  REQUEST_FETCH_RECORDS
} from '../actions/actionTypes'
// import types
import { 
  RequestSubmitRecords, 
  ResponseRecordType,
  RequestFetchRecords
} from '../types/Record'
// import apis
import { requestPostRecords, requestFetchRecord } from '../apis/Records'
import { 
  successSubmitRecords, 
  failureSubmitRecords,
  SuccessFetchRecords,
  failureFetchRecords
} from '../actions'

// 記録の保存
function* runRequestSubmitRecords(action: RequestSubmitRecords) {
  const { records, word } = action
  const { payload, error }: { payload?: string, error?: string } = yield call(
    requestPostRecords,
    records,
    word
  )

  if (payload && !error) {
    yield delay(2000)
    yield put(successSubmitRecords())
  } else {
    yield put(failureSubmitRecords(error))
  }
}

function* handleRequestSubmitRecords() {
  yield takeEvery(REQUEST_SUBMIT_RECORDS, runRequestSubmitRecords)
}

// 記録の取得
function* runRequestFetchRecords(action: RequestFetchRecords) {
  const { uid } = action
  const { payload, error } : { payload?: ResponseRecordType[], error?: string } = yield call(
    requestFetchRecord,
    uid
  )

  if (payload && !error) {
    yield put(SuccessFetchRecords(payload))
  } else {
    yield put(failureFetchRecords(error))
  }
}

function* handleRequestFetchRecords() {
  yield takeEvery(REQUEST_FETCH_RECORDS, runRequestFetchRecords)
}

export default function* recordSaga() {
  yield fork(handleRequestSubmitRecords)
  yield fork(handleRequestFetchRecords)
}
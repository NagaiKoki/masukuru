import { fork, takeEvery, call, put, delay, takeLatest } from 'redux-saga/effects'
// import actions
import { 
  REQUEST_SUBMIT_RECORDS, 
  REQUEST_FETCH_RECORDS,
  REQUEST_NEXT_RECORDS
} from '../actions/actionTypes'
// import types
import { 
  RequestSubmitRecords, 
  ResponseRecordType,
  RequestFetchRecords,
  RequestNextRecords
} from '../types/Record'
// import apis
import { requestPostRecords, requestFetchRecord } from '../apis/Records'
import { 
  successSubmitRecords, 
  failureSubmitRecords,
  SuccessFetchRecords,
  failureFetchRecords,
  successFetchNextRecords,
  failureFetchNextRecords
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
  const { uid, groupId } = action
  const startAt = null
  const { payload, error } : { payload?: ResponseRecordType[], error?: string } = yield call(
    requestFetchRecord,
    uid,
    startAt,
    groupId
  )

  if (payload && !error) {
    yield put(SuccessFetchRecords(payload, uid, groupId))
  } else {
    yield put(failureFetchRecords(error))
  }
}

function* handleRequestFetchRecords() {
  yield takeLatest(REQUEST_FETCH_RECORDS, runRequestFetchRecords)
}

// 記録の追加読み込み
function* runRequestNextFetchRecords(action: RequestNextRecords) {
  const { uid, lastRecord, groupId } = action
  const { payload, error } : { payload?: ResponseRecordType[], error?: string } = yield call(
    requestFetchRecord,
    uid,
    lastRecord, 
    groupId
  )

  if (payload && !error) {
    yield put(successFetchNextRecords(payload, uid, groupId))
  } else {
    yield put(failureFetchNextRecords(error))
  }
}

// 記録追加ハンドラー
function* handleRequestNextFetchRecords() {
  yield takeLatest(REQUEST_NEXT_RECORDS, runRequestNextFetchRecords)
}

export default function* recordSaga() {
  yield fork(handleRequestSubmitRecords)
  yield fork(handleRequestFetchRecords)
  yield fork(handleRequestNextFetchRecords)
}
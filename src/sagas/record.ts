import { fork, select, takeEvery, call, put, delay, takeLatest } from 'redux-saga/effects'
// import action types
import { 
  REQUEST_SUBMIT_RECORDS, 
  REQUEST_FETCH_RECORDS,
  REQUEST_NEXT_RECORDS,
  REQUEST_DESTORY_RECORD,
  REQUEST_POST_RECORD_COMMENT
} from '../actions/actionTypes'
// import types
import { 
  RequestSubmitRecords, 
  ResponseRecordType,
  RequestFetchRecords,
  RequestNextRecords,
  RequestDestroyRecord,
  RequestPostRecordComment,
  RecordCommentType,
} from '../types/Record'
import { RootState } from '../reducers'
// import apis
import { 
  requestPostRecords, 
  requestFetchRecord, 
  requestDestroyRecord,
} from '../apis/Records'
import { requestPostRecordPost } from '../apis/Records/Reaction'
// import actions
import { 
  successSubmitRecords, 
  failureSubmitRecords,
  SuccessFetchRecords,
  failureFetchRecords,
  successFetchNextRecords,
  failureFetchNextRecords,
  successDestroyRecord,
  failureDestroyRecord,
  successPostRecordComment,
  failurePostRecordComment,
} from '../actions/records'

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

// 記録の削除
function* runRequestDestroyRecord(action: RequestDestroyRecord) {
  const { id } = action
  const { payload, error }: { payload?: string, error?: string } = yield call(
    requestDestroyRecord,
    id
  )
  if (payload && !error) {
    yield put(successDestroyRecord(id))
  } else {
    yield put(failureDestroyRecord(error))
  }
}

// 記録の削除ハンドラー
function* handleRequestDestroyRecord() {
  yield takeEvery(REQUEST_DESTORY_RECORD, runRequestDestroyRecord)
}

// 記録へのコメント送信リクエスト
function* runRequestPostRecordComment(action: RequestPostRecordComment) {  
  const { recordId } = action
  const { temporaryComment } = yield select((state: RootState) => state.records)
  const { payload, error }: { payload?: RecordCommentType, error?: string } = yield call(
    requestPostRecordPost,
    recordId,
    temporaryComment
  )

  if (payload && !error) {
    yield put(successPostRecordComment(payload))
  } else if (error) {
    yield put(failurePostRecordComment(error))
  }
}

// 記録へのコメントリクエストハンドラー
function* handleRequestPostRecordComment() {
  yield takeEvery(REQUEST_POST_RECORD_COMMENT, runRequestPostRecordComment)
}

export default function* recordSaga() {
  yield fork(handleRequestSubmitRecords)
  yield fork(handleRequestFetchRecords)
  yield fork(handleRequestNextFetchRecords)
  yield fork(handleRequestDestroyRecord)
  yield fork(handleRequestPostRecordComment)
}
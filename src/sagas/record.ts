import { fork, select, takeEvery, call, put, delay, takeLatest } from 'redux-saga/effects'
// import action types
import { 
  REQUEST_SUBMIT_RECORDS, 
  REQUEST_FETCH_RECORDS,
  REQUEST_NEXT_RECORDS,
  REQUEST_DESTORY_RECORD,
  REQUEST_POST_RECORD_COMMENT,
  REQUEST_FETCH_RECORD_COMMENTS,
  REQUEST_DELETE_RECORD_COMMENT,
  REQUEST_POST_COMMENT_NOTIFICATION
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
  RequestFetchRecordComments,
  RequestDeleteRecordComment,
} from '../types/Record'
import { RequestPostCommentNotification } from '../types/Notification'
import { RootState } from '../reducers'
// import apis
import { 
  requestPostRecords, 
  requestFetchRecord, 
  requestDestroyRecord,
} from '../apis/Records'
import { 
  requestPostRecordPost, 
  requestGetRecordComments,
  requestDeleteRecordComment
 } from '../apis/Records/Reaction'
 import { requestPutSuggestRecord } from '../apis/Search/Records/suggest'
 import { requestPostCommentNotification as requestPostCommentNotf } from '../apis/Notifications'
 import { requestSendRecordPostNotification } from '../apis/Push'
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
  successFetchRecordComments,
  failureFetchRecordComments,
  successDeleteRecordComment,
  failureDeleteRecordComment,
} from '../actions/records'
import { 
  requestPostCommentNotification,
  addNotificationRetryCount
} from '../actions/notifications'
// import config
import firebase from '../config/firebase'
import Analytics from '../config/amplitude'
// import utils
import { convertTimestampToString } from '../utilities/timestamp'
import * as RecordAnalytics from '../utilities/Analytics/record'

// 記録の保存
function* runRequestSubmitRecords(action: RequestSubmitRecords) {
  const { trainingDate } = yield select((state: RootState) => state.records)
  const { records, word } = action
  const { payload, error }: { payload?: string, error?: string } = yield call(
    requestPostRecords,
    records,
    word,
    trainingDate
  )
  function* requestPostRecordNamesForSuggest () {
    records.forEach(async record => {
      await requestPutSuggestRecord(record.name)
    })
  }

  RecordAnalytics.trackSaveRecord(word, trainingDate, records.length)
  RecordAnalytics.trackRecordContents(records)

  if (payload && !error) {
    yield delay(2000)
    yield requestPostRecordNamesForSuggest()
    yield call(requestSendRecordPostNotification)
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

// コメント通知リクエスト
function* runRequestPostCommentNotification(action: RequestPostCommentNotification) {
  const { recordUserId, recordId, notificationType } = action
  const { retryCount } = yield select((state: RootState) => state.notifications )
  const { error }: { success?: string, error?: string } = yield call(
    requestPostCommentNotf,
    recordUserId,
    recordId,
    notificationType
  )

  // 失敗が10回達するまでリトライする
  if (!!error && retryCount < 10) {
    yield put(addNotificationRetryCount())
    yield put(requestPostCommentNotification(recordUserId, recordId, notificationType))
  }
}

// コメント通知リクエストハンドラー
function* handleRequestPostCommentNotification() {
  yield takeEvery(REQUEST_POST_COMMENT_NOTIFICATION, runRequestPostCommentNotification)
}

// 記録へのコメント送信リクエスト
function* runRequestPostRecordComment(action: RequestPostRecordComment) {  
  const { recordId, recordUserId, notificationGroupId } = action
  const { temporaryComment } = yield select((state: RootState) => state.records)
  const { payload, error }: { payload?: RecordCommentType, error?: string } = yield call(
    requestPostRecordPost,
    recordId,
    temporaryComment,
    notificationGroupId
  )

  if (payload && !error) {
    yield put(successPostRecordComment(payload))
    if (recordUserId !== firebase.auth().currentUser.uid) {
      yield put(requestPostCommentNotification(recordUserId, recordId, 'comment'))
    }
  } else if (error) {
    yield put(failurePostRecordComment(error))
  }
}

// 記録へのコメントリクエストハンドラー
function* handleRequestPostRecordComment() {
  yield takeEvery(REQUEST_POST_RECORD_COMMENT, runRequestPostRecordComment)
}

// 記録のコメント取得リクエスト
function* runRequestFetchRecordComments(action: RequestFetchRecordComments) {
  const { recordId } = action
  const { payload, error }: { payload?: RecordCommentType[], error?: string } = yield call(
    requestGetRecordComments,
    recordId
  )

  if (payload && !error) {
    yield put(successFetchRecordComments(payload))
  } else if (error) {
    yield put(failureFetchRecordComments(error))
  }
 }

// 記録のコメント取得リクエストハンドラー
function* handleRequestFetchRecordComments() {
  yield takeEvery(REQUEST_FETCH_RECORD_COMMENTS, runRequestFetchRecordComments)
}

// 記録のコメント削除リクエスト
function* runRequestDeleteRecordComment(action: RequestDeleteRecordComment) {
  const { recordId, commentId } = action
  const { payload, error }: { payload?: string, error?: string } = yield call(
    requestDeleteRecordComment,
    recordId,
    commentId
  )

  if (payload && !error) {
    yield put(successDeleteRecordComment(commentId))
  } else if (error) {
    yield put(failureDeleteRecordComment(error))
  }
}

// 記録のコメント削除リクエストハンドラー
function* handleRequestDeleteRecordComment() {
  yield takeEvery(REQUEST_DELETE_RECORD_COMMENT, runRequestDeleteRecordComment)
}

export default function* recordSaga() {
  yield fork(handleRequestSubmitRecords)
  yield fork(handleRequestFetchRecords)
  yield fork(handleRequestNextFetchRecords)
  yield fork(handleRequestDestroyRecord)
  yield fork(handleRequestPostRecordComment)
  yield fork(handleRequestFetchRecordComments)
  yield fork(handleRequestDeleteRecordComment)
  yield fork(handleRequestPostCommentNotification)
}
import { PayloadAction } from '@reduxjs/toolkit'
import { fork, select, takeEvery, call, put, delay, takeLatest } from 'redux-saga/effects'
// import slice
import {  
  requestFetchRecords,
  successFetchRecords,
} from '../slice/record'
// import types
import { 
  ResponseRecordType,
  RecordCommentType,
  RequestFetchRecordType,
  RequestSubmitRecords,
  RequestNextRecords,
  RequestDestroyRecord,
  RequestPostRecordComment
} from '../types/Record'
import { RequestPostCommentNotification } from '../types/Notification'
import { RootState } from '../reducers'
// import apis
import { 
  requestPostRecords, 
  requestFetchRecord, 
  requestFetchDestroyRecord,
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
  requestSubmitRecords,
  successSubmitRecords, 
  failureSubmitRecords,
  failureFetchRecords,
  requestNextRecords,
  successFetchNextRecords,
  failureFetchNextRecords,
  requestDestroyRecord,
  successDestroyRecord,
  failureDestroyRecord,
  requestPostRecordComment,
  successPostRecordComment,
  failurePostRecordComment,
  successFetchRecordComments,
  failureFetchRecordComments,
  successDeleteRecordComment,
  failureDeleteRecordComment,
} from '../slice/record'
import { 
  requestPostCommentNotification,
  addNotificationRetryCount,
  requestPostPushNotification
} from '../actions/notifications'
// import config
import firebase from '../config/firebase'
// import utils
import * as RecordAnalytics from '../utilities/Analytics/record'

// 記録の保存
function* runRequestSubmitRecords(action: PayloadAction<RequestSubmitRecords>) {
  const { trainingDate } = yield select((state: RootState) => state.records)
  const { records, word, imageUrl } = action.payload
  const { payload, error }: { payload?: string, error?: string } = yield call(
    requestPostRecords,
    records,
    word,
    trainingDate,
    imageUrl
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
  yield takeEvery(requestSubmitRecords.type, runRequestSubmitRecords)
}

// 記録の取得
function* runRequestFetchRecords(action: PayloadAction<RequestFetchRecordType>) {
  const { uid, groupId } = action.payload
  const startAt = null
  const { payload, error } : { payload?: ResponseRecordType[], error?: string } = yield call(
    requestFetchRecord,
    uid,
    startAt,
    groupId
  )

  if (payload && !error) {
    yield put(successFetchRecords({ payload: payload, uid: uid, groupId: groupId}))
  } else {
    yield put(failureFetchRecords(error))
  }
}

function* handleRequestFetchRecords() {
  yield takeLatest(requestFetchRecords.type, runRequestFetchRecords)
}

// 記録の追加読み込み
function* runRequestNextFetchRecords(action: PayloadAction<RequestNextRecords>) {
  const { uid, lastRecord, groupId } = action.payload
  const { payload, error } : { payload?: ResponseRecordType[], error?: string } = yield call(
    requestFetchRecord,
    uid,
    lastRecord, 
    groupId
  )

  if (payload && !error) {
    yield put(successFetchNextRecords({ payload: payload, uid: uid, groupId: groupId }))
  } else {
    yield put(failureFetchNextRecords(error))
  }
}

// 記録追加ハンドラー
function* handleRequestNextFetchRecords() {
  yield takeLatest(requestNextRecords.type, runRequestNextFetchRecords)
}

// 記録の削除
function* runRequestDestroyRecord(action: PayloadAction<RequestDestroyRecord>) {
  const { id } = action.payload
  const { payload, error }: { payload?: string, error?: string } = yield call(
    requestFetchDestroyRecord,
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
  yield takeEvery(requestDestroyRecord.type, runRequestDestroyRecord)
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
  yield takeEvery(requestPostRecordComment.type, runRequestPostCommentNotification)
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
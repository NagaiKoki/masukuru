import { PayloadAction } from '@reduxjs/toolkit'
import { fork, select, takeEvery, call, put, delay, takeLatest } from 'redux-saga/effects'
// import slice
import {  
  requestFetchRecords,
  successFetchRecords,
  requestFetchRecord as requestFetchGetRecord,
  successFetchRecord,
  failureFetchRecord
} from '../slice/record'
// import types
import { REQUEST_POST_COMMENT_NOTIFICATION } from '../actions/actionTypes'
import { 
  ResponseRecordType,
  RecordCommentType,
  RequestFetchRecordType,
  RequestSubmitRecords,
  RequestNextRecords,
  RequestPostRecordComment,
  RequestDeleteComment
} from '../types/Record'
import { ResponseType } from '../types'
import { RequestPostCommentNotification } from '../types/Notification'
import { RootState } from '../reducers'
// import apis
import { 
  requestPostRecords, 
  requestFetchRecord, 
  requestFetchDestroyRecord,
  requestFetchRecordItem,
  requestUpdateRecordItem
} from '../apis/Records'
import { 
  requestPostRecordPost, 
  requestGetRecordComments,
  requestFetchDeleteRecordComment
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
  requestUpdateRecord,
  successUpdateRecord,
  failureUpdateRecord,
  requestPostRecordComment,
  successPostRecordComment,
  failurePostRecordComment,
  successFetchRecordComments,
  failureFetchRecordComments,
  requestFetchRecordComments,
  requestDeleteRecordComment,
  successDeleteRecordComment,
  failureDeleteRecordComment,
} from '../slice/record'
import { 
  requestPostCommentNotification,
  addNotificationRetryCount,
} from '../actions/notifications'
// import config
import firebase from '../config/firebase'
// import utils
import * as RecordAnalytics from '../utilities/Analytics/record'

const recordSelector = (state: RootState) => state.records

// 記録の保存
function* runRequestSubmitRecords(action: PayloadAction<RequestSubmitRecords>) {
  const { trainingDate } = yield select((state: RootState) => state.records)
  const { records, word, imageUrl } = action.payload
  const { payload, error }: ResponseType<number> = yield call(
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
    yield put(successSubmitRecords(payload))
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
  const { payload, error } : ResponseType<ResponseRecordType[]> = yield call(
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

// 個別記録のフェッチ
function* runRequestFetchRecord(action: PayloadAction<string>) {
  const id = action.payload
  const { payload, error }: ResponseType<ResponseRecordType> = yield call(
    requestFetchRecordItem,
    id
  )
  if (payload && !error) {
    yield put(successFetchRecord(payload))
  } else if (error) {
    yield put(failureFetchRecord(error))
  }
}

function* handleRequestFetchRecord() {
  yield takeEvery(requestFetchGetRecord.type, runRequestFetchRecord)
}

// 記録の追加読み込み
function* runRequestNextFetchRecords(action: PayloadAction<RequestNextRecords>) {
  const { uid, lastRecord, groupId } = action.payload
  const { payload, error } : ResponseType<ResponseRecordType[]> = yield call(
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
function* runRequestDestroyRecord(action: PayloadAction<string>) {
  const id = action.payload
  const { payload, error }: ResponseType<string> = yield call(
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

function* runRequestUpdateRecord(action: PayloadAction<RequestSubmitRecords>) {
  const { word, imageUrl, records, id } = action.payload
  const { trainingDate }: ReturnType<typeof recordSelector> = yield select(recordSelector)
  const { payload, error } : ResponseType<string> = yield call(
    requestUpdateRecordItem,
    id,
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

  if (payload && !error) {
    yield delay(2000)
    yield requestPostRecordNamesForSuggest()
    yield put(successUpdateRecord())
  } else if (error) {
    yield put(failureUpdateRecord(error))
  }
}

function* handleRequestUpdateRecord() {
  yield takeEvery(requestUpdateRecord.type, runRequestUpdateRecord)
}

/////////////////////// コメント //////////////////////////////////
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
function* runRequestPostRecordComment(action: PayloadAction<RequestPostRecordComment>) {  
  const { recordId, recordUserId, notificationGroupId, text } = action.payload
  const { payload, error }: ResponseType<RecordCommentType> = yield call(
    requestPostRecordPost,
    recordId,
    text,
    notificationGroupId,
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
  yield takeEvery(requestPostRecordComment.type, runRequestPostRecordComment)
}

// 記録のコメント取得リクエスト
function* runRequestFetchRecordComments(action: PayloadAction<string>) {
  const recordId = action.payload
  const { payload, error }: ResponseType<RecordCommentType[]> = yield call(
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
  yield takeEvery(requestFetchRecordComments.type, runRequestFetchRecordComments)
}

// 記録のコメント削除リクエスト
function* runRequestDeleteRecordComment(action: PayloadAction<RequestDeleteComment>) {
  const { recordId, commentId } = action.payload
  const { payload, error }: ResponseType<string> = yield call(
    requestFetchDeleteRecordComment,
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
  yield takeEvery(requestDeleteRecordComment.type, runRequestDeleteRecordComment)
}

export default function* recordSaga() {
  yield fork(handleRequestSubmitRecords)
  yield fork(handleRequestFetchRecords)
  yield fork(handleRequestFetchRecord)
  yield fork(handleRequestNextFetchRecords)
  yield fork(handleRequestDestroyRecord)
  yield fork(handleRequestUpdateRecord)
  yield fork(handleRequestPostRecordComment)
  yield fork(handleRequestFetchRecordComments)
  yield fork(handleRequestDeleteRecordComment)
  yield fork(handleRequestPostCommentNotification)
}
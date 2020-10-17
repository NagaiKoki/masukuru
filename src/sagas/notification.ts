import { PayloadAction } from '@reduxjs/toolkit'
import { fork, takeEvery, put, call, takeLatest } from 'redux-saga/effects'
// import action types
import {
  REQUEST_FETCH_NOT_READ_NOTIFICATION_NUMBER, REQUEST_READ_NOTIFICATION, REQUEST_POST_PUSH_NOTIFICATION, REQUEST_FETCH_NOTIFICATIONS
} from '../actions/actionTypes'
// import types
import { RequestReadNotification, RequestPoshPushNotification, NotificationType } from '../types/Notification'
// import apis
import {
  requestNotifications,
  requestUnReadNotificationSize,
  requestReadOfficialNotification,
  requestReadCommentNotification
} from '../apis/Notifications'
import { requestSendPushNotification } from '../apis/Push'
// import actions
import {
  failureFetchNotReadNotificationNumber, 
  failureReadNotification,
} from '../actions/notifications'
// import slices
import {
  requestReadNotification,
  successReadCommentNotification,
  successReadOfficialNotification,
  requestFetchNotReadNotificationNumber,
  successFetchNotReadNotificationNumber,
  requestFetchNotifications,
  successFetchNotifications, 
  failureFetchNotifications 
} from '../slice/notification'
// import config
import firebase from '../config/firebase'

// お知らせの取得
function* runRequestFetchNotifications() {
  const { payload, error }: { payload?: NotificationType[], error?: string } = yield call(
    requestNotifications
  )

  if (payload && !error) {
    yield put(successFetchNotifications(payload))
  } else if (!!error) {
    yield put(failureFetchNotifications(error))
  }
}

// お知らせの取得ハンドラー
function* handleRequestFetchNotifications() {
  yield takeEvery(requestFetchNotifications.type, runRequestFetchNotifications)
}

// 未読数の取得
function* runRequestUnReadNotificationSize() {
  const uid = firebase.auth().currentUser.uid
  const { size, error }: { size?: number, error?: string } = yield call(
    requestUnReadNotificationSize,
    uid
  )

  if ((size || size === 0) && !error) {
    yield put(successFetchNotReadNotificationNumber(size))
  } else {
    yield put(failureFetchNotReadNotificationNumber(error))
  }
}

// 未読数の取得ハンドラー
function* handleRequestFetchNotReadNotificationNumber() {
  yield takeLatest(requestFetchNotReadNotificationNumber.type, runRequestUnReadNotificationSize)
}

// 既読リクエスト
function* runRequestReadNotification(action: PayloadAction<RequestReadNotification>) {
  const { id, type } = action.payload
  const requestRead = type === 'official' ? requestReadOfficialNotification : requestReadCommentNotification
  const { payload, error }: { payload?: string,  error?: string } = yield call(
    requestRead,
    id
  )

  if (payload && !error) {
    if (type === 'official') {
      yield put(successReadOfficialNotification(id))
    } else {
      yield put(successReadCommentNotification(id))
    }
  } else if (error) {
    yield put(failureReadNotification())
  }
}

// 既読リクエストハンドラー
function* handleRequestReadNotification() {
  yield takeEvery(requestReadNotification.type, runRequestReadNotification)
}

//////////////// プッシュ通知
// プッシュ通知送信リクエスト
function* runRequestPostPushNotification(action: RequestPoshPushNotification) {
  const { eventType, uid, title, content } = action
  const { success, error }: { success?: string, error?: string } = yield call(
    requestSendPushNotification,
    uid,
    title,
    content
  )
}

// プッシュ通知送信リクエストハンドラー
function* handleRequestPostPushNotification() {
  yield takeEvery(REQUEST_POST_PUSH_NOTIFICATION, runRequestPostPushNotification)
}


export default function* notificationSaga() {
  yield fork(handleRequestFetchNotReadNotificationNumber)
  yield fork(handleRequestReadNotification)
  yield fork(handleRequestPostPushNotification)
  yield fork(handleRequestFetchNotifications)
}
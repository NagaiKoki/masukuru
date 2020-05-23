import { fork, takeEvery, put, call, takeLatest } from 'redux-saga/effects'
// import action types
import {
  REQUEST_FETCH_NOT_READ_NOTIFICATION_NUMBER, REQUEST_READ_NOTIFICATION
} from '../actions/actionTypes'
// import types
import { RequestReadNotification } from '../types/Notification'
// import apis
import {
  requestUnReadNotificationSize,
  requestReadNotification
} from '../apis/Notifications'
// import actions
import {
  successFetchNotReadNotificationNumber,
  failureFetchNotReadNotificationNumber, 
  successReadNotification,
  alreadyReadNotification,
  failureReadNotification
} from '../actions/notifications'
// import config
import firebase from '../config/firebase'

// 未読数の取得
function* runRequestUnReadNotificationSize() {
  const uid = firebase.auth().currentUser.uid
  const { size, error }: { size?: number, error?: string } = yield call(
    requestUnReadNotificationSize,
    uid
  )

  if (size && !error) {
    yield put(successFetchNotReadNotificationNumber(size))
  } else {
    yield put(failureFetchNotReadNotificationNumber(error))
  }
}

// 未読数の取得ハンドラー
function* handleRequestFetchNotReadNotificationNumber() {
  yield takeLatest(REQUEST_FETCH_NOT_READ_NOTIFICATION_NUMBER, runRequestUnReadNotificationSize)
}

// 既読リクエスト
function* runRequestReadNotification(action: RequestReadNotification) {
  const { id } = action
  const { payload, readNotification, error }: { payload?: string, readNotification?: string,  error?: string } = yield call(
    requestReadNotification,
    id
  )

  if (payload && !error && !readNotification) {
    yield put(successReadNotification())
  } else if (!payload && readNotification && !error) {
    yield put(alreadyReadNotification())
  } else {
    yield put(failureReadNotification())
  }
}

// 既読リクエストハンドラー
function* handleRequestReadNotification() {
  yield takeEvery(REQUEST_READ_NOTIFICATION, runRequestReadNotification)
}

export default function* notificationSaga() {
  yield fork(handleRequestFetchNotReadNotificationNumber)
  yield fork(handleRequestReadNotification)
}
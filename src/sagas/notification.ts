import { fork, takeEvery, put, call } from 'redux-saga/effects'
// import action types
import {
  REQUEST_FETCH_NOT_READ_NOTIFICATION_NUMBER
} from '../actions/actionTypes'
// import types
import { RequestFetchNotReadNotificationNumber } from '../types/Notification'
// import apis
import {
  requestUnReadNotificationSize
} from '../apis/Notifications'
// import actions
import {
  successFetchNotReadNotificationNumber,
  failureFetchNotReadNotificationNumber, 
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
  yield takeEvery(REQUEST_FETCH_NOT_READ_NOTIFICATION_NUMBER, runRequestUnReadNotificationSize)
}

export default function* notificationSaga() {
  yield fork(handleRequestFetchNotReadNotificationNumber)
}
import { PayloadAction } from '@reduxjs/toolkit'
import { takeEvery, fork, call, put } from 'redux-saga/effects'
// import slice
import {  
  requestFetchEmailSignIn,
  successFetchEmailSignIn,
  failureFetchEmailSignIn,
  requestFetchLogout,
  successFetchLogout,
  failureFetchLogout
} from '../slice/auth'
// import apis
import { requestEmailSingIn, requestLogout } from '../apis/auth/index'
// import types
import { EmailSignInType } from '../types/auth'
import { ResponseType } from '../types'

// サインアップ or サインイン
function* runRequestFetchEmailSignIn(action: PayloadAction<EmailSignInType>) {
  const { payload, error }: ResponseType<string> = yield call(
    requestEmailSingIn,
    action.payload
  )

  if (payload && !error) {
    yield put(successFetchEmailSignIn(action.payload.method))
  } else if (error) {
    yield put(failureFetchEmailSignIn(error))
  }
}

function* handleRequestFetchEmailSignIn() {
  yield takeEvery(requestFetchEmailSignIn.type, runRequestFetchEmailSignIn)
}

// ログアウト
function* runRequestFetchLogout() {
  const { payload, error }: ResponseType<string> = yield call(
    requestLogout
  )
  
  if (payload && !error) {
    yield put(successFetchLogout())
  } else if (error) {
    yield put(failureFetchLogout(error))
  }
}

function* handleRequestFetchLogout() {
  yield takeEvery(requestFetchLogout.type, runRequestFetchLogout)
}

export default function* authSaga() {
  yield fork(handleRequestFetchEmailSignIn)
  yield fork(handleRequestFetchLogout)
}
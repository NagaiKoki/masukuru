import { PayloadAction } from '@reduxjs/toolkit'
import { takeEvery, fork, call, put } from 'redux-saga/effects'
// import slice
import {  
  requestFetchEmailSignIn,
  successFetchEmailSignIn,
  failureFetchEmailSignIn,
  requestFetchLogout,
  successFetchLogout,
  failureFetchLogout,
  requestThirdPartyAuth,
  successThirdPartyAuth,
  failureThirdPartyAuth,
} from '../slice/auth'
import { setToastMessage } from '../slice/ui'
// import apis
import { requestEmailSingIn, requestLogout, appleLogin, googleLogin } from '../apis/auth'
// import types
import { EmailSignInType, ThirdPartySignInType } from '../types/auth'
import { ResponseType } from '../types'

// サインアップ or サインイン
function* runRequestFetchEmailSignIn(action: PayloadAction<EmailSignInType>) {
  const { payload, error }: ResponseType<string> = yield call(
    requestEmailSingIn,
    action.payload
  )

  if (payload && !error) {
    yield put(successFetchEmailSignIn(action.payload.method))
    if (action.payload.method === 'signin') {
      yield put(setToastMessage({ message: 'ログインしました', type: 'success' }))
    }
  } else if (error) {
    yield put(failureFetchEmailSignIn(error))
  }
}

function* handleRequestFetchEmailSignIn() {
  yield takeEvery(requestFetchEmailSignIn.type, runRequestFetchEmailSignIn)
}

// 外部認証リクエスト
function* runRequestThirdPartyAuth(action: PayloadAction<ThirdPartySignInType>) {
  const { method, type } = action.payload
  const requestThirdPartyAuthApi = type === 'apple' ? appleLogin : googleLogin
  const { payload, error }: ResponseType<string> = yield call(
    requestThirdPartyAuthApi
  )
  if (payload && !error) {
    yield put(successThirdPartyAuth(method))
  } else if (error) {
    yield put(failureThirdPartyAuth(error))
  }
}

function* handleRequestThirdPartyAuth() {
  yield takeEvery(requestThirdPartyAuth.type, runRequestThirdPartyAuth)
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
  yield fork(handleRequestThirdPartyAuth)
}
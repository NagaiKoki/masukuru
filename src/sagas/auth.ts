import { PayloadAction } from '@reduxjs/toolkit'
import { takeEvery, fork, call, put } from 'redux-saga/effects'
// import slice
import {  
  requestFetchEmailSignIn,
  successFetchEmailSignIn,
  failureFetchEmailSignIn
} from '../slice/auth'
// import apis
import { requestEmailSingIn } from '../apis/auth/index'
// import types
import { EmailSignInType } from '../types/auth'
import { ResponseType } from '../types'

function* runRequestFetchEmailSignIn(action: PayloadAction<EmailSignInType>) {
  const { payload, error }: ResponseType<string> = yield call(
    requestEmailSingIn,
    action.payload
  )

  if (payload && !error) {
    yield put(successFetchEmailSignIn())
  } else if (error) {
    yield put(failureFetchEmailSignIn(error))
  }
}

function* handleRequestFetchEmailSignIn() {
  yield takeEvery(requestFetchEmailSignIn.type, runRequestFetchEmailSignIn)
}

export default function* authSaga() {
  yield fork(handleRequestFetchEmailSignIn)
}
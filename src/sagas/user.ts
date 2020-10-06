import { PayloadAction } from '@reduxjs/toolkit'
import { fork, takeEvery, put, call } from 'redux-saga/effects'
// import types
import { UserType } from '../types/User'
import { ResponseType } from '../types'
// import actions
import { 
  requestFetchCurrentUserData,
  successFetchCurrentUserData, 
  failureFetchCurrentUserData,
  requestUpdateUser,
  successUpdateUser,
  failureUpdateUser
} from '../slice/user'
// import apis
import { requestFetchUser, requestFetchUpdateUser } from '../apis/Users'

function* runRequestUserData(action: PayloadAction<string>) {
  const { user, error }: { user?: UserType, error?: string } = yield call(
    requestFetchUser,
    action.payload
  )

  if (user && !error) {
    yield put(successFetchCurrentUserData(user))
  } else if (error) {
    yield put(failureFetchCurrentUserData(error))
  }
}

function* handleRequestCurrentUser() {
  yield takeEvery(requestFetchCurrentUserData.type, runRequestUserData)
}

function* runRequestUpdateUser(action: PayloadAction<UserType>) {
  const { payload, error }: ResponseType<UserType> = yield call(
    requestFetchUpdateUser,
    action.payload
  )

  if (payload && !error) {
    yield put(successUpdateUser(action.payload))
  } else if (error) {
    yield put(failureUpdateUser(error))
  }
}

function* handleRequestUpdateUser() {
  yield takeEvery(requestUpdateUser.type, runRequestUpdateUser)
}

export default function* userSaga() {
  yield fork(handleRequestCurrentUser)
  yield fork(handleRequestUpdateUser)
}
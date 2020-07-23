import { fork, takeEvery, put, call, takeLatest } from 'redux-saga/effects'
// import action types
import { REQUEST_FETCH_USER_DATA } from '../actions/actionTypes'
// import types
import { UserType, RequestFetchUserData } from '../types/User'
// import actions
import { successFetchUserData, failureFetchUserData } from '../actions/User'
// import apis
import { requestFetchUser } from '../apis/Users'

function* runRequestUserData(action: RequestFetchUserData) {
  const { uid } = action
  const { user, error }: { user?: UserType, error?: string } = yield call(
    requestFetchUser,
    uid
  )

  if (user && !error) {
    yield put(successFetchUserData(user))
  } else if (error) {
    yield put(failureFetchUserData(error))
  }
}

function* handleRequestCurrentUser() {
  yield takeEvery(REQUEST_FETCH_USER_DATA, runRequestUserData)
}

export default function* userSaga() {
  yield fork(handleRequestCurrentUser)
}
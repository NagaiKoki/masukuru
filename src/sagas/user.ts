import { PayloadAction } from '@reduxjs/toolkit'
import { fork, takeEvery, put, call } from 'redux-saga/effects'
// import types
import { UserType, RequestFetchUserData } from '../types/User'
// import actions
import { 
  requestFetchCurrentUserData,
  successFetchCurrentUserData, 
  failureFetchCurrentUserData 
} from '../slice/user'
// import apis
import { requestFetchUser } from '../apis/Users'

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

export default function* userSaga() {
  yield fork(handleRequestCurrentUser)
}
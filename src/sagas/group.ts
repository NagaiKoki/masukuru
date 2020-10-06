import { PayloadAction } from '@reduxjs/toolkit'
import { takeEvery, call, put, fork, select } from 'redux-saga/effects'
// import apis
import { requestPostCreateGroup, requestPatchJoinGroup } from '../apis/Groups/v1/'
// import types
import { GroupType } from '../types/Group'
import { ResponseType } from '../types'
import { RootState } from '../reducers'
// import slices
import { 
  requestCreateGroup,
  successCreateGroup,
  failureCreateGroup,
  requestJoinGroup,
  successJoinGroup,
  failureJoinGroup
} from '../slice/group'
import { setUserStatus } from '../slice/auth'
import { setToastMessage } from '../slice/ui'

const userSelector = (state: RootState) => state.users

function* runRequestCreateGroup() {
  const { currentUser }: ReturnType<typeof userSelector> = yield select(userSelector)
  const { payload, error }: ResponseType<GroupType> = yield call(
    requestPostCreateGroup,
    currentUser
  )

  if (payload && !error) {
    yield put(successCreateGroup(payload))
    yield put(setUserStatus('authorized'))
    yield put(setToastMessage({ message: 'グループを作成しました', type: 'success' }))
  } else if (error) {
    yield put(failureCreateGroup(error))
  }
}

function* handleRequestCreateGroup() {
  yield takeEvery(requestCreateGroup.type, runRequestCreateGroup)
}

function* runRequestJoinGroup(action: PayloadAction<string>) {
  const { currentUser }: ReturnType<typeof userSelector> = yield select(userSelector)
  const { payload, error }: ResponseType<GroupType> = yield call(
    requestPatchJoinGroup,
    action.payload,
    currentUser
  )

  if (payload && !error) {
    yield put(successJoinGroup(payload.id))
    yield put(setUserStatus('authorized'))
    yield put(setToastMessage({ message: 'グループに参加しました', type: 'success' }))
  } else if (error) {
    yield put(failureJoinGroup(error))
  }
}

function* handleRequestJoinGroup() {
  yield takeEvery(requestJoinGroup.type, runRequestJoinGroup)
}

export default function* groupSaga() {
  yield fork(handleRequestCreateGroup)
  yield fork(handleRequestJoinGroup)
}
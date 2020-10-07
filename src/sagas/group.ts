import { PayloadAction } from '@reduxjs/toolkit'
import { takeEvery, call, put, fork, select } from 'redux-saga/effects'
// import apis
import { 
  requestPostCreateGroup, 
  requestPatchJoinGroup,
  requestFetchCurrentGroupId,
  requestFetchGetCurrentGroupUsers
} from '../apis/Groups/v1/'
// import types
import { GroupType, GroupUserType } from '../types/Group'
import { ResponseType } from '../types'
import { RootState } from '../reducers'
// import slices
import { 
  requestCreateGroup,
  successCreateGroup,
  failureCreateGroup,
  requestJoinGroup,
  successJoinGroup,
  failureJoinGroup,
  setCurrentGroupId,
  successSetCurrentGroupId,
  failureSetCurrentGroupId,
  requestFetchCurrentGroupUsers,
  successFetchCurrentGroupUsers,
  failureFetchCurrentGroupUsers,
  requestFetchBelongGroups,
  successFetchBelongGroups,
  failureFetchBelongGroups
} from '../slice/group'
import { setUserStatus } from '../slice/auth'
import { setToastMessage } from '../slice/ui'

const userSelector = (state: RootState) => state.users
const groupSelector = (state: RootState) => state.groups

// １人のグループを作成
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

// 招待先のグループに参加する
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

// 現在いるグループのidを取得
function* runRequestFetchCurrentGroupId() {
  const { payload, error }: ResponseType<string> = yield call(
    requestFetchCurrentGroupId
  )

  if (payload && !error) {
    yield put(successSetCurrentGroupId(payload))
  } else if (error) {
    yield put(failureSetCurrentGroupId(error))
  }
}

function* handleRequestFetchCurrentGroupId() {
  yield takeEvery(setCurrentGroupId.type, runRequestFetchCurrentGroupId)
}

// 現在所属しているグループのユーザーを取得
function* runRequestFetchCurrentGroupUsers() {
  const { currentGroupId }: ReturnType<typeof groupSelector> = yield select(groupSelector)
  const { payload, error }: ResponseType<GroupUserType[]> = yield call(
    requestFetchGetCurrentGroupUsers,
    currentGroupId
  )

  if (payload && !error) {
    yield put(successFetchCurrentGroupUsers(payload))
  } else if (error) {
    yield put(failureFetchCurrentGroupUsers(error))
  }
}

function* handleRequestFetchCurrentGroupUsers() {
  yield takeEvery(requestFetchCurrentGroupUsers.type, runRequestFetchCurrentGroupUsers)
}

// 所属しているグループを取得
function* runRequestFetchBelongGroups() {
  
}

function* handleRequestFetchBelongGroups() {
  yield takeEvery(requestFetchBelongGroups.type, runRequestFetchBelongGroups)
}

export default function* groupSaga() {
  yield fork(handleRequestCreateGroup)
  yield fork(handleRequestJoinGroup)
  yield fork(handleRequestFetchCurrentGroupId)
  yield fork(handleRequestFetchCurrentGroupUsers)
  yield fork(handleRequestFetchBelongGroups)
}
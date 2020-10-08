import { PayloadAction } from '@reduxjs/toolkit'
import { takeEvery, call, put, fork, select } from 'redux-saga/effects'
// import apis
import { 
  requestPostCreateGroup, 
  requestPatchJoinGroup,
  requestFetchCurrentGroupId,
  requestFetchGetCurrentGroupUsers,
  requestFetchGetBelongGroups,
  requestPatchCurrentGroupId,
  requestFetchCurrentGroup as requestFetchGetCurrentGroup,
  requestPatchGroupInfoData
} from '../apis/Groups/v1/'
// import types
import { GroupType, GroupUserType, RequestPatchGroupType } from '../types/Group'
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
  failureFetchBelongGroups,
  requestSwitchGroup,
  successSwitchGroup,
  failureSwitchGroup,
  requestFetchCurrentGroup,
  successFetchCurrentGroup,
  failureFetchCurrentGroup,
  requestPatchGroupInfo,
  successPatchGroupInfo,
  failurePatchGroupInfo
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
    yield put(setToastMessage({ message: error, type: 'error' }))
    yield put(failureCreateGroup(error))
  }
}

function* handleRequestCreateGroup() {
  yield takeEvery(requestCreateGroup.type, runRequestCreateGroup)
}

// 招待先のグループに参加する
function* runRequestJoinGroup(action: PayloadAction<string>) {
  const { payload, error }: ResponseType<GroupType> = yield call(
    requestPatchJoinGroup,
    action.payload
  )

  if (payload && !error) {
    yield put(successJoinGroup(payload.id))
    yield put(setUserStatus('authorized'))
    yield put(setToastMessage({ message: 'グループに参加しました', type: 'success' }))
  } else if (error) {
    yield put(setToastMessage({ message: error, type: 'error' }))
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
  const { payload, error }: ResponseType<GroupType[]> = yield call(
    requestFetchGetBelongGroups
  )

  if (payload && !error) {
    yield put(successFetchBelongGroups(payload))
  } else if (error) {
    yield put(failureFetchBelongGroups(error))
  }
}

function* handleRequestFetchBelongGroups() {
  yield takeEvery(requestFetchBelongGroups.type, runRequestFetchBelongGroups)
}

// グループを切り替える
function* runRequestSwitchGroup(action: PayloadAction<string>) {
  const { currentUser }: ReturnType<typeof userSelector> = yield select(userSelector)
  const { payload, error }: ResponseType<string> = yield call(
    requestPatchCurrentGroupId,
    action.payload,
    currentUser
  )
  if (payload && !error) {
    yield put(successSwitchGroup(action.payload))
    yield put(setToastMessage({ message: 'グループを切り替えました', type: 'success' }))
  } else if (error) {
    yield put(failureSwitchGroup(error))
  }
}

function* handleRequestSwitchGroup() {
  yield takeEvery(requestSwitchGroup.type, runRequestSwitchGroup)
}

// 現在のグループをフェッチする
function* runRequestFetchCurrentGroup() {
  const { currentGroupId }: ReturnType<typeof groupSelector> = yield select(groupSelector)
  const { payload, error }: ResponseType<GroupType> = yield call(
    requestFetchGetCurrentGroup,
    currentGroupId
  )

  if (payload && !error) {
    yield put(successFetchCurrentGroup(payload))
  } else if (error) {
    yield put(failureFetchCurrentGroup(error))
  }
}

function* handleRequestFetchCurrentUGroup() {
  yield takeEvery(requestFetchCurrentGroup.type, runRequestFetchCurrentGroup)
}

// グループ情報を更新する
function* runRequestPatchGroupInfo(action: PayloadAction<RequestPatchGroupType>) {
  const { currentGroupId }: ReturnType<typeof groupSelector> = yield select(groupSelector)
  const { payload, error }: ResponseType<string> = yield call(
    requestPatchGroupInfoData,
    action.payload,
    currentGroupId
  )

  if (payload && !error) {
    yield put(successPatchGroupInfo(action.payload))
  } else if (error) {
    yield put(failurePatchGroupInfo(error))
  }
}

function* handleRequestPatchGroupInfo() {
  yield takeEvery(requestPatchGroupInfo.type, runRequestPatchGroupInfo)
}

export default function* groupSaga() {
  yield fork(handleRequestCreateGroup)
  yield fork(handleRequestJoinGroup)
  yield fork(handleRequestFetchCurrentGroupId)
  yield fork(handleRequestFetchCurrentGroupUsers)
  yield fork(handleRequestFetchBelongGroups)
  yield fork(handleRequestSwitchGroup)
  yield fork(handleRequestFetchCurrentUGroup)
  yield fork(handleRequestPatchGroupInfo)
}
import { PayloadAction } from '@reduxjs/toolkit'
import { fork, select, takeEvery, call, put, delay, takeLatest } from 'redux-saga/effects'
// import slice
import {  
  requestPostWeight,
  successPostWeight,
  failurePostWeight
} from '../slice/chart'
// import types
import { RequestPostWeightType, UserWeightType } from '../types/Chart'
// import apis
import { requestPostWeight as requestFetchPostWeight } from '../apis/Chart'

function* runRequestPostWeight(action: PayloadAction<RequestPostWeightType>) {
  const { weight, date } = action.payload
  const { payload, error }: { payload?: UserWeightType, error?: string } = yield call(
    requestFetchPostWeight,
    weight,
    date
  )

  console.log(payload)

  if (payload && !error) {
    yield put(successPostWeight(payload))
  } else if (error) {
    yield put(failurePostWeight(error))
  }
}

function* handleRequestPostWeight() {
  yield takeEvery(requestPostWeight.type, runRequestPostWeight)
}

export default function* chartSaga() {
  yield fork(handleRequestPostWeight)
}
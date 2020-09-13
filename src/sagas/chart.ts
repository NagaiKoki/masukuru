import { PayloadAction } from '@reduxjs/toolkit'
import { fork, select, takeEvery, call, put, delay, takeLatest } from 'redux-saga/effects'
// import slice
import {  
  requestFetchWeights,
  successFetchWeights,
  failureFetchWeights,
  requestPostWeight,
  successPostWeight,
  failurePostWeight,
} from '../slice/chart'
// import types
import { 
  RequestPostWeightType, 
  UserWeightType,
  RequestFetchChartType
} from '../types/Chart'
// import apis
import { 
  requestPostWeight as requestFetchPostWeight, 
  requestFetchWeights as requestFetchGetWeights  
} from '../apis/Chart'

function* runRequestFetchWeight(action: PayloadAction<RequestFetchChartType>) {
  const { date, type } = action.payload
  const { payload, error }: { payload?: UserWeightType[], error?: string } = yield call(
    requestFetchGetWeights,
    date,
    type
  )

  if (payload && !error) {
    yield put(successFetchWeights(payload))
  } else if (error) {
    yield put(failureFetchWeights(error))
  }
}

function* handleRequestFetchRecord() {
  yield takeEvery(requestFetchWeights.type, runRequestFetchWeight)
}

function* runRequestPostWeight(action: PayloadAction<RequestPostWeightType>) {
  const { weight, date } = action.payload
  const { payload, error }: { payload?: UserWeightType, error?: string } = yield call(
    requestFetchPostWeight,
    weight,
    date
  )

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
  yield fork(handleRequestFetchRecord)
}
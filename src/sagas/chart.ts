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
  requestFetchChartSetting,
  successFetchChartSetting,
  failureFetchChartSetting,
  requestPostChartSetting,
  successPostChartSetting,
  failurePostChartSetting,
} from '../slice/chart'
// import types
import { 
  RequestPostWeightType, 
  UserWeightType,
  RequestFetchChartType,
  RequestChartSettingType,
  ResponseChartSettingType,
} from '../types/Chart'
import { ResponseType } from '../types'
// import apis
import { 
  requestPostWeight as requestFetchPostWeight, 
  requestFetchWeights as requestFetchGetWeights,
  requestFetchGetChartSetting,
  requestFetchPostChartSetting
} from '../apis/Chart'

function* runRequestFetchWeight(action: PayloadAction<RequestFetchChartType>) {
  const { date, type } = action.payload
  const { payload, error }: ResponseType<UserWeightType[]> = yield call(
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
  const { payload, error }: ResponseType<UserWeightType> = yield call(
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

function* runRequestFetchChartSetting() {
  const { payload, error }: ResponseType<ResponseChartSettingType> = yield call(
    requestFetchGetChartSetting
  )

  if (payload && !error) {
    yield put(successFetchChartSetting(payload))
  } else if (!error) {
    yield put(failureFetchChartSetting(error))
  }
}

function* handleRequestFetchChartSetting() {
  yield takeEvery(requestFetchChartSetting.type, runRequestFetchChartSetting)
}

function* runRequestPostChartSetting(action: PayloadAction<RequestChartSettingType>) {
  const { payload, error }: ResponseType<ResponseChartSettingType> = yield call(
    requestFetchPostChartSetting,
    action.payload
  )

  if (payload && !error) {
    yield put(successPostChartSetting(payload))
  } else if (!error) {
    yield put(failurePostChartSetting(error))
  }
}

function* handleRequestPostChartSetting() {
  yield takeEvery(requestPostChartSetting.type, runRequestPostChartSetting)
}

export default function* chartSaga() {
  yield fork(handleRequestPostWeight)
  yield fork(handleRequestFetchRecord)
  yield fork(handleRequestPostChartSetting)
  yield fork(handleRequestFetchChartSetting)
}
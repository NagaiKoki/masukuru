import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import types
import { 
  UserWeightType, 
  ChartState, 
  RequestPostWeightType,
  RequestFetchChartType,
  RequestChartSettingType,
  ResponseChartSettingType
} from '../types/Chart'

const initialState: ChartState = {
  isLoading: false,
  weights: [],
  error: '',
  weightGoal: 0,
  walkingGoal: 0
}

const chartSlice = createSlice({
  name: 'chart',
  initialState: initialState,
  reducers: {
    requestFetchWeights: (state, action: PayloadAction<RequestFetchChartType>) => {
      return {
        ...state,
        isLoading: true
      }
    },
    successFetchWeights: (state, action: PayloadAction<UserWeightType[]>) => {
      return {
        ...state,
        weights: action.payload,
        isLoading: false
      }
    },
    failureFetchWeights: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    },
    requestPostWeight: (state, action: PayloadAction<RequestPostWeightType>) => {
      return {
        ...state
      }
    },
    successPostWeight: (state, action: PayloadAction<UserWeightType>) => {
      return {
        ...state,
      }
    },
    failurePostWeight: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload
      }
    },
    requestFetchChartSetting: (state) => {
      return {
        ...state,
      }
    },
    successFetchChartSetting: (state, action: PayloadAction<ResponseChartSettingType>) => {
      const { weightGoal, walkingGoal } = action.payload
      return {
        ...state,
        weightGoal: weightGoal || 0,
        walkingGoal: walkingGoal || 0
      }
    },
    failureFetchChartSetting: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload
      }
    },
    requestPostChartSetting: (state, action: PayloadAction<RequestChartSettingType>) => {
      return {
        ...state,
      }
    },
    successPostChartSetting: (state, action: PayloadAction<ResponseChartSettingType>) => {
      const { weightGoal, walkingGoal } = action.payload
      return {
        ...state,
        weightGoal,
        walkingGoal
      }
    },
    failurePostChartSetting: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload
      }
    }
  }
})

export const {
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
  failurePostChartSetting
} = chartSlice.actions

export default chartSlice
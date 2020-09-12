import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import types
import { UserWeightType, ChartState, RequestPostWeightType } from '../types/Chart'

const initialState: ChartState = {
  isLoading: false,
  weights: [],
  
  error: ''
}

const chartSlice = createSlice({
  name: 'chart',
  initialState: initialState,
  reducers: {
    requestFetchWeights: (state) => {
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
      const updateWeights = [action.payload, ...state.weights]
      return {
        ...state,
        weights: updateWeights
      }
    },
    failurePostWeight: (state, action: PayloadAction<string>) => {
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
  failurePostWeight
} = chartSlice.actions

export default chartSlice
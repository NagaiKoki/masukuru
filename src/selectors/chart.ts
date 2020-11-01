import { useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
// import types
import { ChartState, UserWeightType, RequestFetchChartType } from '../types/Chart'
import { RootState } from '../reducers'
// import slice
import { requestFetchChartSetting, requestFetchWeights } from '../slice/chart'

const chartSelector = (): ChartState => {
  return useSelector((state: RootState) => state.charts, shallowEqual)
}

export const useChartDispatchers = () => {
  const dispatch = useDispatch()
  const _requestFetchChartSetting = useCallback(() => dispatch(requestFetchChartSetting()), [dispatch])
  const _requestFetchWeights = useCallback((arg: RequestFetchChartType) => dispatch(requestFetchWeights(arg)), [dispatch])

  return {
    requestFetchChartSetting: _requestFetchChartSetting,
    requestFetchWeights: _requestFetchWeights
  }
}

export const useSelectWeights = () => {
  return useSelector<RootState, UserWeightType[]>(state => state.charts.weights)
}

export const useSelectWeightGoal = () => {
  return useSelector<RootState, number>(state => state.charts.weightGoal)
}

export default chartSelector
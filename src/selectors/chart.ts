import { useSelector, shallowEqual } from 'react-redux'
// import types
import { ChartState } from '../types/Chart'
import { RootState } from '../reducers'

const chartSelector = (): ChartState => {
  return useSelector((state: RootState) => state.charts, shallowEqual)
}

export default chartSelector
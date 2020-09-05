import { useSelector, shallowEqual } from 'react-redux'
// import types
import { RecordState } from '../types/Record'
import { RootState } from '../reducers'

const recordSelector = (): RecordState => {
  return useSelector((state: RootState) => state.records, shallowEqual)
}

export default recordSelector
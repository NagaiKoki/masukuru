import { useSelector, shallowEqual } from 'react-redux'
// import types
import { SuggestRecordState } from '../types/Search/Record/suggest'
import { RootState } from '../reducers'

export const suggestRecordSelector = (): SuggestRecordState => {
  return useSelector((state: RootState) => state.suggestRecords, shallowEqual)
}
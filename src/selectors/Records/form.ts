import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
// import types
import { RootState } from '../../reducers'

const suggestRecordNames = (state: RootState) => state.suggestRecords.recordNames
const suggestIsLoading = (state: RootState) => state.suggestRecords.isLoading

// export const selectSuggestRecordValue = createSelector(
//   [suggestRecordNames, suggestIsLoading],
//   (names: string[], isLoading: boolean) => [names, isLoading]
// )

// export const suggestNamesWithLoading = useSelector(
//   (state: RootState) => selectSuggestRecordValue(state)
// )

export const selectSuggestRecordValue = () => {
 
}
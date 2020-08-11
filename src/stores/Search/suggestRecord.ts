// import toolkit
import { createSlice } from '@reduxjs/toolkit'
// import types
import { 
  initialSuggestRecordState,
  SuccessFetchSuggestRecords,
  FailureFetchSuggestRecords
} from '../../types/Search/Record/suggest'

const initialState: initialSuggestRecordState = {
  isLoading: false,
  recordNames: [],
  error: ''
}

const slice = createSlice({
  name: 'suggestRecord',
  initialState,
  reducers: {
    requestFetchSuggestRecords: (state) => {
      return {
        ...state,
        isLoading: false
      }
    },
    
    successFetchSuggestRecords: (state, action: SuccessFetchSuggestRecords) => {
      const { payload } = action
      return {
        ...state,
        recordNames: payload
      }
    },

    failureFetchSuggestRecords: (state, action: FailureFetchSuggestRecords) => {
      const { payload } = action
      return {
        ...state,
        error: payload
      }
    }
  }
})
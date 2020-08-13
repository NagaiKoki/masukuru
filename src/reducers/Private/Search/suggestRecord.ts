// import action types
import {
  REQUEST_FETCH_SUGGEST_RECORDS,
  SUCCESS_FETCH_SUGGEST_RECORDS,
  FAILURE_FETCH_SUGGEST_RECORDS
} from '../../../actions/actionTypes'
// import types
import {  
  SuggestRecordState,
  SuggestRecordActionTypes
} from '../../../types/Search/Record/suggest'

const initialState: SuggestRecordState = {
  isLoading: false,
  recordNames: [],
  error: ''
}

const suggestRecordReducer = (
  state = initialState,
  action: SuggestRecordActionTypes
): SuggestRecordState => {
  switch(action.type) {
    case REQUEST_FETCH_SUGGEST_RECORDS: {
      return {
        ...state,
        isLoading: true
      }
    }

    case SUCCESS_FETCH_SUGGEST_RECORDS: {
      const { payload } = action
      return {
        ...state,
        recordNames: payload,
        isLoading: false
      }
    }

    case FAILURE_FETCH_SUGGEST_RECORDS: {
      const { error } = action
      return {
        ...state,
        error
      }
    }
    default:
      return state
  }
}

export default suggestRecordReducer
// import actionTypes
import { ADD_RECORD, DELETE_RECORD } from '../actions/actionTypes'
// import types
import { RecordState, RecordActionTypes } from '../types/Record/'

const initialState: RecordState = {
  recordItems: []
}

const recordReducer = (
  state = initialState,
  action: RecordActionTypes
): RecordState => {
  switch (action.type) {
    case ADD_RECORD: {
      return {
        ...state
      }
    }

    case DELETE_RECORD: {
      return {
        ...state
      }
    }

    default:
      return state
  }
}

export default recordReducer
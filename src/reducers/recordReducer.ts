// import actionTypes
import { ADD_RECORD, DELETE_RECORD, ON_CHANGE_TRAINING_NAME } from '../actions/actionTypes'
// import types
import { RecordState, RecordActionTypes } from '../types/Record/'

const initialState: RecordState = {
  recordItems: [],
  trainingName: ''
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

    case ON_CHANGE_TRAINING_NAME: {
      const { name } = action
      console.log(name)
      return {
        ...state,
        trainingName: name
      }
    }

    default:
      return state
  }
}

export default recordReducer
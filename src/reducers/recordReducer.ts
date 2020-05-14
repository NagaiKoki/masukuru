// import actionTypes
import { 
  ADD_RECORD, 
  DELETE_RECORD, 
  ON_CHANGE_TRAINING_NAME, 
  ON_CHANG_SET_COUNT, 
} from '../actions/actionTypes'
// import types
import { RecordState, RecordItemType, RecordActionTypes } from '../types/Record/'

const initialState: RecordState = {
  recordItems: [],
  temporaryName: '',
  temporarySet: 0,
  temporaryamounts: [],
  temporaryWeights: []
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
      return {
        ...state,
        temporaryName: name
      }
    }

    case ON_CHANG_SET_COUNT: {
      const { payload } = action
      return {
        ...state,
        temporarySet: payload
      }
    }

    default:
      return state
  }
}

export default recordReducer
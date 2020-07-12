// import action types
import { 
  REQUEST_FETCH_USER_DATA,
  SUCCESS_FETCH_USER_DATA,
  FAILURE_FETCH_USER_DATA
} from '../../actions/actionTypes'
// import types
import { 
  UserActionTypes,
  UserState,
  UserType,
} from '../../types/User'

const initialUserState: UserState = {
  currentUser: null,
  error: ''
}

const userReducer = (
  state = initialUserState,
  action: UserActionTypes
) => {
  switch(action.type) {
    case SUCCESS_FETCH_USER_DATA: {
      const { payload } = action
      return {
        ...state,
        currentUser: payload
      }
    }

    case FAILURE_FETCH_USER_DATA: {
      const { error } = action
      return {
        ...state,
        error
      }
    }
  }
}

export default userReducer
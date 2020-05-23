// import action types
import {
  SET_CURRENT_GROUP_ID
} from '../../actions/actionTypes'
// import types
import {
  GroupState,
  GroupActionTypes
} from '../../types/Group'

const initialState: GroupState = {
  currentGroupid: ''
}

const groupReducer = (
  state = initialState,
  action: GroupActionTypes
): GroupState => {
  switch(action.type) {
    // グループIDの設定
    case SET_CURRENT_GROUP_ID: {
      const { id } = action
      return {
        ...state,
        currentGroupid: id
      }
    }

    default:
      return state
  }
}

export default groupReducer
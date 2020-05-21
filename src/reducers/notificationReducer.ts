// import action types
import { 
  REQUEST_FETCH_NOT_READ_NOTIFICATION_NUMBER,
  SUCCESS_FETCH_NOT_READ_NOTIFICATION_NUMBER,
  FAILURE_FETCH_NOT_READ_NOTIFICATION_NUMBER
 } from '../actions/actionTypes'
// import types
import {
  NoticationState,
  NotificationActionTypes,
  RequestFetchNotReadNotificationNumber,
  SuccessFetchNotReadNotificationNumber,
  FailureFetchNotReadNotificationNumber
} from '../types/Notification'

const initialState: NoticationState = {
  unReadSize: 0
}

const notificationReducer = (
  state = initialState,
  action: NotificationActionTypes
): NoticationState => {
  switch(action.type) {
    // 未読件数の取得
    case REQUEST_FETCH_NOT_READ_NOTIFICATION_NUMBER: {
      return {
        ...state
      }
    }

    // 未読件数の取得成功
    case SUCCESS_FETCH_NOT_READ_NOTIFICATION_NUMBER: {
      const { size } = action
      return {
        ...state,
        unReadSize: size
      }
    }

    // 未読件数の取得失敗
    case FAILURE_FETCH_NOT_READ_NOTIFICATION_NUMBER: {
      const { error } = action
      return {
        ...state 
      }
    }
    
    default: 
      return state
  }
}

export default notificationReducer;


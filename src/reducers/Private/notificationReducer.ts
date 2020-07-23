// import action types
import { 
  REQUEST_FETCH_NOT_READ_NOTIFICATION_NUMBER,
  SUCCESS_FETCH_NOT_READ_NOTIFICATION_NUMBER,
  FAILURE_FETCH_NOT_READ_NOTIFICATION_NUMBER,
  REQUEST_READ_NOTIFICATION,
  SUCCESS_READ_NOTIFICATION,
  FAILURE_READ_NOTIFICATION,
  ALREADY_READ_NOTIFICATION,
  ADD_NOTIFICATION_RETRY_COUNT,
  REQUEST_FETCH_NOTIFICATIONS,
  SUCCESS_FETCH_NOTIFICATIONS,
  FAILURE_FETCH_NOTIFICATIONS
 } from '../../actions/actionTypes'
// import types
import {
  NoticationState,
  NotificationActionTypes,
} from '../../types/Notification'

const initialState: NoticationState = {
  isLoading: false,
  notificationItems: [],
  error: '',
  unReadSize: 0,
  retryCount: 0

}

const notificationReducer = (
  state = initialState,
  action: NotificationActionTypes
): NoticationState => {
  switch(action.type) {
    // お知らせ取得
    case REQUEST_FETCH_NOTIFICATIONS: {
      return {
        ...state,
        isLoading: true
      }
    }

    // お知らせ取得成功
    case SUCCESS_FETCH_NOTIFICATIONS: {
      const { payload } = action
      return {
        ...state,
        isLoading: false,
        notificationItems: payload
      }
    }

    // お知らせ取得失敗
    case FAILURE_FETCH_NOTIFICATIONS: {
      const { error } = action
      return {
        ...state,
        isLoading: false,
        error
      }
    }

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
      return {
        ...state 
      }
    }

    // 既読リクエスト
    case REQUEST_READ_NOTIFICATION: {
      return {
        ...state
      }
    }
    
    // 既読リクエスト成功
    case SUCCESS_READ_NOTIFICATION: {
      return {
        ...state,
        unReadSize: state.unReadSize - 1 
      }
    }

    // すでに既読の場合
    case ALREADY_READ_NOTIFICATION: {
      return {
        ...state
      }
    }

    // 既読リクエスト失敗
    case FAILURE_READ_NOTIFICATION: {
      return {
        ...state
      }
    }

    // 通知のリトライ回数追加
    case ADD_NOTIFICATION_RETRY_COUNT: {
      return {
        ...state,
        retryCount: state.retryCount + 1
      }
    }

    default: 
      return state
  }
}

export default notificationReducer;


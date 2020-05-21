import { 
  REQUEST_FETCH_NOT_READ_NOTIFICATION_NUMBER,
  SUCCESS_FETCH_NOT_READ_NOTIFICATION_NUMBER,
  FAILURE_FETCH_NOT_READ_NOTIFICATION_NUMBER,
  REQUEST_READ_NOTIFICATION,
  SUCCESS_READ_NOTIFICATION,
  FAILURE_READ_NOTIFICATION
} from '../../actions/actionTypes'

export type NoticationState = {
  unReadSize: number
}

// 未読数の取得
export interface RequestFetchNotReadNotificationNumber {
  type: typeof REQUEST_FETCH_NOT_READ_NOTIFICATION_NUMBER
}

// 未読数の取得成功
export interface SuccessFetchNotReadNotificationNumber {
  type: typeof SUCCESS_FETCH_NOT_READ_NOTIFICATION_NUMBER
  size: number
}

// 未読数の取得失敗
export interface FailureFetchNotReadNotificationNumber {
  type: typeof FAILURE_FETCH_NOT_READ_NOTIFICATION_NUMBER
  error: string
}

// 既読リクエスト
export interface RequestReadNotification {
  type: typeof REQUEST_READ_NOTIFICATION
  id: string
}

// 既読リクエスト成功
export interface SuccessReadNotification {
  type: typeof SUCCESS_READ_NOTIFICATION
}

// 既読リクエスト失敗
export interface FailureReadNotification {
  type: typeof FAILURE_READ_NOTIFICATION
}

export type NotificationActionTypes =
  | RequestFetchNotReadNotificationNumber
  | SuccessFetchNotReadNotificationNumber
  | FailureFetchNotReadNotificationNumber
  | RequestReadNotification
  | SuccessReadNotification
  | FailureReadNotification

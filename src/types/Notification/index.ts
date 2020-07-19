import { 
  REQUEST_FETCH_NOT_READ_NOTIFICATION_NUMBER,
  SUCCESS_FETCH_NOT_READ_NOTIFICATION_NUMBER,
  FAILURE_FETCH_NOT_READ_NOTIFICATION_NUMBER,
  REQUEST_READ_NOTIFICATION,
  SUCCESS_READ_NOTIFICATION,
  FAILURE_READ_NOTIFICATION,
  ALREADY_READ_NOTIFICATION,
  REQUEST_POST_COMMENT_NOTIFICATION,
  ADD_NOTIFICATION_RETRY_COUNT
} from '../../actions/actionTypes'

export type NoticationState = {
  unReadSize: number,
  retryCount: number
}

export type NotificationType = {
  type: NotificationEventType, // 0. comment
  from: string, // uid
  groupId: string,
  read: boolean
}

export type NotificationEventType = 0 | 1 | 2 // 0: コメント, 1: somethig

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

// すでに既読の場合
export interface AlreadReadNotification {
  type: typeof ALREADY_READ_NOTIFICATION
}

// 既読リクエスト失敗
export interface FailureReadNotification {
  type: typeof FAILURE_READ_NOTIFICATION
}

// コメントの通知リクエスト
export interface RequestPostCommentNotification {
  type: typeof REQUEST_POST_COMMENT_NOTIFICATION
  recordUserId: string
  notificationType: NotificationEventType
}

// リクエストのリトライ回数追加
export interface AddNotificationRetryCount {
  type: typeof ADD_NOTIFICATION_RETRY_COUNT,
}

export type NotificationActionTypes =
  | RequestFetchNotReadNotificationNumber
  | SuccessFetchNotReadNotificationNumber
  | FailureFetchNotReadNotificationNumber
  | RequestReadNotification
  | SuccessReadNotification
  | AlreadReadNotification
  | FailureReadNotification
  | RequestPostCommentNotification
  | AddNotificationRetryCount

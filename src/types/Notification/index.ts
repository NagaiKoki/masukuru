import { 
  REQUEST_FETCH_NOT_READ_NOTIFICATION_NUMBER,
  SUCCESS_FETCH_NOT_READ_NOTIFICATION_NUMBER,
  FAILURE_FETCH_NOT_READ_NOTIFICATION_NUMBER
} from '../../actions/actionTypes'

export type NoticationState = {
  unReadSize: number
}

export interface RequestFetchNotReadNotificationNumber {
  type: typeof REQUEST_FETCH_NOT_READ_NOTIFICATION_NUMBER
}

export interface SuccessFetchNotReadNotificationNumber {
  type: typeof SUCCESS_FETCH_NOT_READ_NOTIFICATION_NUMBER
  size: number
}

export interface FailureFetchNotReadNotificationNumber {
  type: typeof FAILURE_FETCH_NOT_READ_NOTIFICATION_NUMBER
  error: string
}

export type NotificationActionTypes =
  | RequestFetchNotReadNotificationNumber
  | SuccessFetchNotReadNotificationNumber
  | FailureFetchNotReadNotificationNumber

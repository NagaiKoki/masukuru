// import action type
import {
   REQUEST_FETCH_NOT_READ_NOTIFICATION_NUMBER,
   SUCCESS_FETCH_NOT_READ_NOTIFICATION_NUMBER,
   FAILURE_FETCH_NOT_READ_NOTIFICATION_NUMBER
} from '../actionTypes'
// import types
import { NotificationActionTypes } from '../../types/Notification'

// 未読通知の数のリクエスト
export const requestFetchNotReadNotificationNumber = (): NotificationActionTypes => {
  return {
    type: REQUEST_FETCH_NOT_READ_NOTIFICATION_NUMBER
  }
}

// 未読通知の数のリクエスト成功
export const successFetchNotReadNotificationNumber = (size: number): NotificationActionTypes => {
  return {
    type: SUCCESS_FETCH_NOT_READ_NOTIFICATION_NUMBER,
    size
  }
}

// 未読通知の数のリクエスト失敗
export const failureFetchNotReadNotificationNumber = (error: string): NotificationActionTypes => {
  return {
    type: FAILURE_FETCH_NOT_READ_NOTIFICATION_NUMBER,
    error
  }
}
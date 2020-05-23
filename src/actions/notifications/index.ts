// import action type
import {
   REQUEST_FETCH_NOT_READ_NOTIFICATION_NUMBER,
   SUCCESS_FETCH_NOT_READ_NOTIFICATION_NUMBER,
   FAILURE_FETCH_NOT_READ_NOTIFICATION_NUMBER,
   REQUEST_READ_NOTIFICATION,
   SUCCESS_READ_NOTIFICATION,
   FAILURE_READ_NOTIFICATION,
   ALREADY_READ_NOTIFICATION
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

// 既読リクエスト
export const requestReadNotification = (id: string): NotificationActionTypes => {
  return {
    type: REQUEST_READ_NOTIFICATION,
    id
  }
}

// 既読リクエスト成功
export const successReadNotification = (): NotificationActionTypes => {
  return {
    type: SUCCESS_READ_NOTIFICATION,
  }
}

// すでに既読の場合
export const alreadyReadNotification = (): NotificationActionTypes => {
  return {
    type: ALREADY_READ_NOTIFICATION
  }
}

// 既読リクエスト失敗
export const failureReadNotification = (): NotificationActionTypes => {
  return {
    type: FAILURE_READ_NOTIFICATION,
  }
}
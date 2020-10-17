import { useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
// import actions
import {  
  requestFetchNotifications,
  requestFetchNotReadNotificationNumber,
  requestReadNotification
} from '../slice/notification'
// import types
import { RootState } from '../reducers'
import { NotificationType, RequestReadNotification } from '../types/Notification'

export const notificationActions = () => {
  const dispatch = useDispatch()

  const _requestFetchNotifications = useCallback(() => dispatch(requestFetchNotifications()), [dispatch])
  const _requestReadNotification = useCallback((arg: RequestReadNotification) => dispatch(requestReadNotification(arg)), [dispatch])
  const _requestFetchNotReadNotificationNumber = useCallback(() => dispatch(requestFetchNotReadNotificationNumber()), [dispatch])

  return {
    requestFetchNotifications: _requestFetchNotifications,
    requestReadNotification: _requestReadNotification,
    requestFetchNotReadNotificationNumber: _requestFetchNotReadNotificationNumber
  }
}

export const _notificationItems = () => {
  return useSelector<RootState, NotificationType[]>(state => state.notifications.notificationItems, shallowEqual)
}
export const _isLoading = () => {
  return useSelector<RootState, boolean>(state => state.notifications.isLoading, shallowEqual)
}
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import types
import { 
  NoticationState, 
  NotificationType,
  RequestPostCommnetNotificationType,
  RequestReadNotification
} from '../types/Notification'
// import config
import firebase from '../config/firebase'

const initialState: NoticationState = {
  notificationItems: [],
  unReadSize: 0,
  retryCount: 0,
  isLoading: false,
  error: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    requestFetchNotifications: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    successFetchNotifications: (state, action: PayloadAction<NotificationType[]>) => {
      return {
        ...state,
        isLoading: false,
        notificationItems: action.payload
      }
    },
    failureFetchNotifications: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    },
    requestFetchNotReadNotificationNumber: (state) => {
      return {
        ...state
      }
    },
    successFetchNotReadNotificationNumber: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        unReadSize: action.payload
      }
    },
    requestReadNotification: (state, action: PayloadAction<RequestReadNotification>) => {
      return state
    },
    successReadCommentNotification: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const updateNotificationItems = state.notificationItems.map((item, i) => {
        if (item.id === id) {
          state.notificationItems[i].read = true
        }
        return item
      })
      return {
        ...state,
        unReadSize: state.unReadSize - 1,
        notificationItems: updateNotificationItems
      }
    },
    successReadOfficialNotification: (state, action: PayloadAction<string>) => {
      const userId = firebase.auth().currentUser.uid
      let newArry: NotificationType[] = [].concat(state.notificationItems)
      const updateNotificationItems = newArry.map((item, i) => {
        if (item.id === action.payload && item.type === 'official') {
          newArry[i] = {
            ...item,
            readUserIds: item.readUserIds.concat(userId)
          }
          return newArry[i]
        }
        return item
      })
      return {
        ...state,
        unReadSize: state.unReadSize - 1,
        notificationItems: updateNotificationItems
      }
    },
    requestPostEmojiNotification: (state) => {
      return state
    },
  }
})

export default notificationSlice

export const {
  requestFetchNotifications,
  successFetchNotifications,
  failureFetchNotifications,
  requestFetchNotReadNotificationNumber,
  successFetchNotReadNotificationNumber,
  requestPostEmojiNotification,
  requestReadNotification,
  successReadOfficialNotification,
  successReadCommentNotification
} = notificationSlice.actions
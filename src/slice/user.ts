import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import types
import { UserState, UserType } from '../types/User'

const initialState: UserState = {
  currentUser: {
    uid: '',
    name: '',
    sex: '',
    age: '',
    height: '',
    imageUrl: '',
    weight: '',
    expoNotificationToken: '',
    isReviewed: false,
    isCommentPush: false,
    isRecordPostPush: false,
    isApplausedReviewed: false,
  },
  error: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    requestFetchCurrentUserData: (state, action: PayloadAction<string>) => {
      return {
        ...state
      }
    },
    successFetchCurrentUserData: (state, action: PayloadAction<UserType>) => {
      return {
        ...state,
        currentUser: action.payload
      }
    },
    failureFetchCurrentUserData: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload
      }
    },
    requestUpdateUser: (state, action: PayloadAction<UserType>) => {
      return {
        ...state
      }
    },
    successUpdateUser: (state, action: PayloadAction<UserType>) => {
      console.log(action.payload)
      const currentUser = { 
        ...state.currentUser,
        ...action.payload
      }
      return {
        ...state,
        currentUser
      }
    },
    failureUpdateUser: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload
      }
    }
  }
})

export default userSlice

export const {
  requestFetchCurrentUserData,
  successFetchCurrentUserData,
  failureFetchCurrentUserData,
  requestUpdateUser,
  successUpdateUser,
  failureUpdateUser,
} = userSlice.actions
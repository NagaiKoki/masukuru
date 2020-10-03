import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import types
import { UserState, UserType } from '../types/User'

const initialState: UserState = {
  currentUser: null,
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
    }
  }
})

export default userSlice

export const {
  requestFetchCurrentUserData,
  successFetchCurrentUserData,
  failureFetchCurrentUserData
} = userSlice.actions
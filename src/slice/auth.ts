import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import types
import { AuthState, EmailSignInType } from '../types/auth'

const initialState: AuthState = {
  isLoading: false,
  error: '',
  isLogggedIn: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requestFetchLogin: (state, action: PayloadAction<EmailSignInType>) => {
      return {
        ...state,
        isLoading: true
      }
    },
    successFetchLogin: (state) => {
      return {
        ...state,
        isLogggedIn: true
      }
    },
    failureFetchLogin: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload
      }
    }
  }
})

export default authSlice

export const {
  requestFetchLogin,
  successFetchLogin,
  failureFetchLogin
} = authSlice.actions
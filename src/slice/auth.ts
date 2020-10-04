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
    requestFetchEmailSignIn: (state, action: PayloadAction<EmailSignInType>) => {
      return {
        ...state,
        isLoading: true
      }
    },
    successFetchEmailSignIn: (state) => {
      return {
        ...state,
        isLogggedIn: true,
        isLoading: false
      }
    },
    failureFetchEmailSignIn: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    },
    clearError: (state) => {
      return {
        ...state,
        error: '',
      }
    }
  }
})

export default authSlice

export const {
  requestFetchEmailSignIn,
  successFetchEmailSignIn,
  failureFetchEmailSignIn,
  clearError
} = authSlice.actions
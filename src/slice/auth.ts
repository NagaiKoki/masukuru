import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import types
import { 
  AuthState, 
  EmailSignInType,
  AuthMethodType,
  UserStatusType
} from '../types/auth'

const initialState: AuthState = {
  isLoading: false,
  error: '',
  userStatus: 'unauthorized'
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
    successFetchEmailSignIn: (state, action: PayloadAction<AuthMethodType>) => {
      return {
        ...state,
        isLoading: false,
        userStatus: action.payload === 'signin' ? 'authorized' : 'tutorial'
      }
    },
    failureFetchEmailSignIn: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    },
    requestFetchLogout: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    successFetchLogout: (state) => {
      return {
        ...state,
        isLoading: false,
        userStatus: 'unauthorized'
      }
    },
    failureFetchLogout: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    },
    setUserStatus: (state, action: PayloadAction<UserStatusType>) => {
      return {
        ...state,
        userStatus: action.payload
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
  requestFetchLogout,
  successFetchLogout,
  failureFetchLogout,
  setUserStatus,
  clearError
} = authSlice.actions
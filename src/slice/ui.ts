import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import types
import { UiState, ToastMessageType } from '../types/ui'

const initialState: UiState = {
  toastMessage: null
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setToastMessage: (state, action: PayloadAction<ToastMessageType>) => {
      const { message, type } = action.payload
      const toastMessage: ToastMessageType = {
        message,
        type
      }
      return {
        ...state,
        toastMessage
      }
    },
    removeToastMessage: (state) => {
      return {
        ...state,
        toastMessage: null
      }
    }
  }
})

export default uiSlice

export const {
  setToastMessage,
  removeToastMessage
} = uiSlice.actions
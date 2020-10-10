import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import types
import { UiState, ToastMessageType, ToggleImageModalType } from '../types/ui'

const initialState: UiState = {
  toastMessage: null,
  imageModalOpen: false
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
    },
    toggleImageModal: (state, action: PayloadAction<ToggleImageModalType>) => {
      return {
        ...state,
        imageModalOpen: !action.payload.isOpen
      }
    }
  }
})

export default uiSlice

export const {
  setToastMessage,
  removeToastMessage,
  toggleImageModal
} = uiSlice.actions
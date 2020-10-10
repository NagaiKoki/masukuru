import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import types
import { UiState, ToastMessageType, ToggleImageModalType } from '../types/ui'

const initialState: UiState = {
  toastMessage: null,
  selectedImage: '',
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
      const { isOpen, imageUrl } = action.payload
      return {
        ...state,
        imageModalOpen: isOpen,
        selectedImage: imageUrl || ''
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
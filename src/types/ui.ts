export interface UiState {
  toastMessage: ToastMessageType
  imageModalOpen: boolean
}

export type ToastMessageType = {
  type: ToastType
  message: string
}

export type ToastType = 'success' | 'error' | 'cancel'

export type ToggleImageModalType = {
  isOpen: boolean
  imageUrl?: string
}
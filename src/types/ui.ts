export interface UiState {
  toastMessage: ToastMessageType
}

export type ToastMessageType = {
  type: ToastType
  message: string
}

export type ToastType = 'success' | 'error' | 'cancel'
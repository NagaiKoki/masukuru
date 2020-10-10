import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
// import slices
import { setToastMessage, removeToastMessage, toggleImageModal } from '../slice/ui'
// import types
import { RootState } from '../reducers'
import { UiState, ToastMessageType, ToggleImageModalType } from '../types/ui'

export const useUiSelector = () => {
  const dispatch = useDispatch()
  const { toastMessage, imageModalOpen, selectedImage } = useSelector<RootState, UiState>(state => state.ui)

  const _setToastMessage = useCallback((type: ToastMessageType) => dispatch(setToastMessage(type)), [dispatch])
  const _removeToastMessage = useCallback(() => dispatch(removeToastMessage()), [dispatch])
  const _toggleImageModal = useCallback((arg: ToggleImageModalType) => dispatch(toggleImageModal(arg)), [dispatch])

  return {
    toastMessage,
    imageModalOpen,
    selectedImage,
    setToastMessage: _setToastMessage,
    removeToastMessage: _removeToastMessage,
    toggleImageModal: _toggleImageModal
  }
}
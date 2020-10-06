import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
// import slices
import { setToastMessage, removeToastMessage } from '../slice/ui'
// import types
import { RootState } from '../reducers'
import { UiState, ToastMessageType } from '../types/ui'

export const useUiSelector = () => {
  const dispatch = useDispatch()
  const { toastMessage } = useSelector<RootState, UiState>(state => state.ui)

  const _setToastMessage = useCallback((type: ToastMessageType) => dispatch(setToastMessage(type)), [dispatch])
  const _removeToastMessage = useCallback(() => dispatch(removeToastMessage()), [dispatch])

  return {
    toastMessage,
    setToastMessage: _setToastMessage,
    removeToastMessage: _removeToastMessage
  }
}
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useCallback } from 'react'
// import types
import { AuthState, EmailSignInType, UserStatusType } from '../types/auth'
import { RootState } from '../reducers'
// import slices
import { 
  requestFetchEmailSignIn,
  setUserStatus,
  clearError
} from '../slice/auth'

export const useAuthSelectors = () => {
  const dispatch = useDispatch()
  const {  
    isLoading,
    error,
    userStatus
  } = useSelector<RootState, AuthState>(state => state.auth, shallowEqual)

  const _requestFetchEmailSignIn = useCallback((args: EmailSignInType) => dispatch(requestFetchEmailSignIn(args)), [dispatch])
  const _clearError = useCallback(() => dispatch(clearError()), [dispatch])
  const _setUserStatus = useCallback((status: UserStatusType) => dispatch(setUserStatus(status)), [dispatch])

  return {
    isLoading,
    error,
    userStatus,
    requestFetchEmailSignIn: _requestFetchEmailSignIn,
    setUserStatus: _setUserStatus,
    clearError: _clearError
  } 
}
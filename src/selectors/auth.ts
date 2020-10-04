import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useCallback } from 'react'
// import types
import { AuthState, EmailSignInType } from '../types/auth'
import { RootState } from '../reducers'
// import slices
import { 
  requestFetchEmailSignIn,
  clearError
} from '../slice/auth'

export const useAuthSelectors = () => {
  const dispatch = useDispatch()
  const {  
    isLoading,
    error,
    isLogggedIn
  } = useSelector<RootState, AuthState>(state => state.auth, shallowEqual)

  const _requestFetchEmailSignIn = useCallback((args: EmailSignInType) => dispatch(requestFetchEmailSignIn(args)), [dispatch])
  const _clearError = useCallback(() => dispatch(clearError()), [dispatch])

  return {
    isLoading,
    error,
    isLogggedIn,
    requestFetchEmailSignIn: _requestFetchEmailSignIn,
    clearError: _clearError
  } 
}
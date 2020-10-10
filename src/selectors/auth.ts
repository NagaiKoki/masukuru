import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useCallback } from 'react'
// import types
import { AuthState, EmailSignInType, UserStatusType, ThirdPartySignInType } from '../types/auth'
import { RootState } from '../reducers'
// import slices
import { 
  requestFetchEmailSignIn,
  requestFetchLogout,
  requestThirdPartyAuth,
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
  const _requestFetchLogout = useCallback(() => dispatch(requestFetchLogout()), [dispatch])
  const _clearError = useCallback(() => dispatch(clearError()), [dispatch])
  const _setUserStatus = useCallback((status: UserStatusType) => dispatch(setUserStatus(status)), [dispatch])
  const _requestThirdPartyAuth = useCallback((arg: ThirdPartySignInType) => dispatch(requestThirdPartyAuth(arg)), [dispatch])

  return {
    isLoading,
    error,
    userStatus,
    requestFetchEmailSignIn: _requestFetchEmailSignIn,
    requestFetchLogout: _requestFetchLogout,
    requestThirdPartyAuth: _requestThirdPartyAuth,
    setUserStatus: _setUserStatus,
    clearError: _clearError
  } 
}
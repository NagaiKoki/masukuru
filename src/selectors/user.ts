import { useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
// import slices
import { 
  requestFetchCurrentUserData,
  requestUpdateUser
} from '../slice/user'
// import types
import { UserState, UserType } from '../types/User'
import { RootState } from '../reducers'

const userSelector = (): UserState => {
  return useSelector((state: RootState) => state.users, shallowEqual)
}

export const useUserSelectors = () => {
  const dispatch = useDispatch()
  const { currentUser } = userSelector()
  const _requestFetchCurrentUserData = useCallback((uid: string) => dispatch(requestFetchCurrentUserData(uid)), [dispatch])
  const _requestUpdateUser = useCallback((arg: UserType) => dispatch(requestUpdateUser(arg)), [dispatch])

  return {
    currentUser,
    requestFetchCurrentUserData: _requestFetchCurrentUserData,
    requestUpdateUser: _requestUpdateUser
  }
}

export default userSelector
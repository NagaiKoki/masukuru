import { useSelector, shallowEqual } from 'react-redux'
// import types
import { UserState } from '../types/User'
import { RootState } from '../reducers'

const userSelector = (): UserState => {
  return useSelector((state: RootState) => state.users, shallowEqual)
}

export default userSelector
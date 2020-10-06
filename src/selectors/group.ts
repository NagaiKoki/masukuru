import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
// import slices
import { 
  requestCreateGroup, 
  requestJoinGroup,
  setCurrentGroupId
} from '../slice/group'
// import types
import { RootState } from '../reducers'
import { GroupState } from '../types/Group'

export const useGroupSelector = () => {
  const dispatch = useDispatch()
  const {  
    currentGroupId,
    isLoading,
    error
  } = useSelector<RootState, GroupState>(state => state.groups)

  const _requestCreateGroup = useCallback(() => dispatch(requestCreateGroup()), [dispatch])
  const _requestJoinGroup = useCallback((code: string) => dispatch(requestJoinGroup(code)), [dispatch])
  const _setCurrentGroupId = useCallback(() => dispatch(setCurrentGroupId()), [dispatch])

  return {
    currentGroupId,
    isLoading,
    error,
    requestCreateGroup: _requestCreateGroup,
    requestJoinGroup: _requestJoinGroup,
    setCurrentGroupId: _setCurrentGroupId
  }
}
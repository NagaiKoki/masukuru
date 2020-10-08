import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
// import slices
import { 
  requestCreateGroup, 
  requestJoinGroup,
  setCurrentGroupId,
  requestFetchCurrentGroupUsers,
  requestFetchBelongGroups,
  requestSwitchGroup,
  requestFetchCurrentGroup,
  requestPatchGroupInfo
} from '../slice/group'
// import types
import { RootState } from '../reducers'
import { GroupState, RequestPatchGroupType } from '../types/Group'

export const useGroupSelector = () => {
  const dispatch = useDispatch()
  const {  
    currentGroupId,
    currentGroup,
    currentGroupUsers,
    belongGroups,
    isLoading,
    error
  } = useSelector<RootState, GroupState>(state => state.groups)

  const _requestCreateGroup = useCallback(() => dispatch(requestCreateGroup()), [dispatch])
  const _requestJoinGroup = useCallback((code: string) => dispatch(requestJoinGroup(code)), [dispatch])
  const _setCurrentGroupId = useCallback(() => dispatch(setCurrentGroupId()), [dispatch])
  const _requestFetchCurrentGroupUsers = useCallback(() => dispatch(requestFetchCurrentGroupUsers()), [dispatch])
  const _requestFetchBelongGroups = useCallback(() => dispatch(requestFetchBelongGroups()), [dispatch])
  const _requestSwitchGroup = useCallback((groupId: string) => dispatch(requestSwitchGroup(groupId)), [dispatch])
  const _requestFetchCurrentGroup = useCallback(() => dispatch(requestFetchCurrentGroup()), [dispatch])
  const _requestPatchGroupInfo = useCallback((groupObj: RequestPatchGroupType) => dispatch(requestPatchGroupInfo(groupObj)), [dispatch])

  return {
    currentGroupId,
    currentGroupUsers,
    currentGroup,
    belongGroups,
    isGroupLoading: isLoading,
    error,
    requestCreateGroup: _requestCreateGroup,
    requestJoinGroup: _requestJoinGroup,
    setCurrentGroupId: _setCurrentGroupId,
    requestFetchCurrentGroupUsers: _requestFetchCurrentGroupUsers,
    requestFetchBelongGroups: _requestFetchBelongGroups,
    requestSwitchGroup: _requestSwitchGroup,
    requestFetchCurrentGroup: _requestFetchCurrentGroup,
    requestPatchGroupInfo: _requestPatchGroupInfo
  }
}
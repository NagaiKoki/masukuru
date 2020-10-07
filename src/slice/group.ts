import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import types
import { GroupState, GroupType, GroupUserType } from '../types/Group'

const initialState: GroupState = {
  currentGroupId: '',
  currentGroupUsers: [],
  currentGroup: null,
  belongGroups: [],
  isLoading: false,
  error: ''
}

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    requestJoinGroup: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoading: true
      }
    },
    successJoinGroup: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoading: false,
        currentGroupId: action.payload
      }
    },
    failureJoinGroup: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload      
      }
    },
    requestCreateGroup: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    successCreateGroup: (state, action: PayloadAction<GroupType>) => {
      const { id } = action.payload
      return {
        ...state,
        isLoading: false,
        currentGroupId: id
      }
    },
    failureCreateGroup: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    },
    setCurrentGroupId: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    successSetCurrentGroupId: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoading: false,
        currentGroupId: action.payload
      }
    },
    failureSetCurrentGroupId: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    },
    requestFetchCurrentGroupUsers: (state) => {
      return {
        ...state,
        isLoading: true
      }
    },
    successFetchCurrentGroupUsers: (state, action: PayloadAction<GroupUserType[]>) => {
      return {
        ...state,
        currentGroupUsers: action.payload,
        isLoading: false
      }
    },
    failureFetchCurrentGroupUsers: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    },
    requestFetchBelongGroups: (state) => {
      return {
        ...state,
      }
    },
    successFetchBelongGroups: (state, action: PayloadAction<GroupType[]>) => {
      return {
        ...state,
        belongGroups: action.payload,
      }
    },
    failureFetchBelongGroups: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
      }
    },
    requestSwitchGroup: (state, action: PayloadAction<string>) => {
      return {
        ...state
      }
    },
    successSwitchGroup: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        currentGroupId: action.payload
      }
    },
    failureSwitchGroup: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload
      }
    },
    requestFetchCurrentGroup: (state)  => {
      return {
        ...state
      }
    },
    successFetchCurrentGroup: (state, action: PayloadAction<GroupType>) => {
      return {
        ...state,
        currentGroup: action.payload
      }
    },
    failureFetchCurrentGroup: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload
      }
    }
  }
})

export default groupSlice

export const {
  requestJoinGroup,
  successJoinGroup,
  failureJoinGroup,
  requestCreateGroup,
  successCreateGroup,
  failureCreateGroup,
  setCurrentGroupId,
  successSetCurrentGroupId,
  failureSetCurrentGroupId,
  requestFetchCurrentGroupUsers,
  successFetchCurrentGroupUsers,
  failureFetchCurrentGroupUsers,
  requestFetchBelongGroups,
  successFetchBelongGroups,
  failureFetchBelongGroups,
  requestSwitchGroup,
  successSwitchGroup,
  failureSwitchGroup,
  requestFetchCurrentGroup,
  successFetchCurrentGroup,
  failureFetchCurrentGroup,
} = groupSlice.actions
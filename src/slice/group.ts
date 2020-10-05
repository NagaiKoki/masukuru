import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import types
import { GroupState } from '../types/Group'

const initialState: GroupState = {
  currentGroupid: '',
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
        currentGroupid: action.payload
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
    successCreateGroup: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoading: false,
        currentGroupid: action.payload
      }
    },
    failureCreateGroup: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoading: false,
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
} = groupSlice.actions
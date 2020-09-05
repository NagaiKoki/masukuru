import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import types
import { 
  RecordState, 
  RecordItemType, 
  SuccessFetchRecordType,
  RecordCommentType,
  RequestFetchRecordType,
  RequestSubmitRecords,
  RequestNextRecords,
  RequestPostRecordComment,
  RequestDeleteComment
} from '../types/Record'
// import constants
import { record } from '../constants/sliceName'

const initialState: RecordState = {
   recordItems: [],
   trainingDate: new Date,
   word: '',
   imageUrl: '',
   error: '',
   isLoading: false,
   recordData: [],
   beforeRecordSize: 0,
   userRecords: [],
   beforeUserRecordSize: 0,
   commentPostError: '',
   comments: []
}

const recordSlice = createSlice({
  name: record,
  initialState: initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<RecordItemType>) => {
      const recordItems = [...state.recordItems, action.payload]
      return {
        ...state,
        recordItems
      }
    },
    deleteRecord: (state, action: PayloadAction<RecordItemType>) => {
      const updateRecordItems = state.recordItems.filter(item => item.id !== action.payload.id)
      return {
        ...state,
        recordItems: updateRecordItems
      }
    },
    requestDestroyRecord: (state, action: PayloadAction<string>) => {
      return state
    },
    successDestroyRecord: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const filteredRecords = state.recordData.filter(data => data.id !== id)
      const filteredUserRecords = state.userRecords.filter(data => data.id !== id)
      return {
        ...state,
        recordData: filteredRecords,
        userRecords: filteredUserRecords
      }
    },
    failureDestroyRecord: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload
      }
    },
    initializeRecords: (state) => {
      return {
        ...state,
        initialState
      }
    },
    updateRecord: (state, action: PayloadAction<RecordItemType>) => {
      const record = action.payload
      const updateRecordItems = state.recordItems.map(item => {
        if (item.id === record.id) {
          return item = record
        }
        return item
      })
      return {
        ...state,
        recordItems: updateRecordItems
      }
    },
    requestSubmitRecords: (state, action: PayloadAction<RequestSubmitRecords>) => {
      return {
        ...state,
        isLoading: true
      }
    },
    successSubmitRecords: (state) => {
      return {
        ...state,
        recordItems: [],
        word: '',
        imageUrl: '',
        error: '',
        isLoading: false
      }
    },
    failureSubmitRecords: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    },
    
    requestFetchRecords: (state, action: PayloadAction<RequestFetchRecordType>) => {
      return {
        ...state,
        isLoading: true
      }
    },
    successFetchRecords: (state, action: PayloadAction<SuccessFetchRecordType>) => {
      const { payload, uid, groupId } = action.payload
      
      if (uid) {
        return {
          ...state,
          userRecords: payload,
          isLoading: false
        }
      } else if (groupId) {
        return {
          ...state,
          recordData: payload,
          isLoading: false
        }
      } else {
        return state
      }
    },
    failureFetchRecords: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload
      }
    },
    requestNextRecords: (state, action: PayloadAction<RequestNextRecords>) => {
      return {
        ...state,
        isLoading: true
      }
    },
    successFetchNextRecords: (state, action: PayloadAction<SuccessFetchRecordType>) => {
      const { payload, uid, groupId } = action.payload
      if (uid) {
        const { userRecords } = state
        const updateRecords = userRecords.concat(payload)
        return {
          ...state,
          userRecords: updateRecords,
          beforeRecordSize: state.userRecords.length,
          isLoading: false
        }
      } else if (groupId) {
        const { recordData } = state
        const updateRecords = recordData.concat(payload)
        return {
          ...state,
          recordData: updateRecords,
          beforeUserRecordSize: state.recordData.length,
          isLoading: false
        }
      } else {
        return state
      }
    },
    failureFetchNextRecords: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload
      }
    },
    requestPostRecordComment: (state, action: PayloadAction<RequestPostRecordComment>) => {
      return state
    },
    successPostRecordComment: (state, action: PayloadAction<RecordCommentType>) => {
      const { payload } = action
      const comments = [...state.comments, payload]
      return {
        ...state,
        comments
      }
    },
    failurePostRecordComment: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        commentPostError: action.payload
      }
    },
    requestFetchRecordComments: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoading: true
      }
    },
    successFetchRecordComments: (state, action: PayloadAction<RecordCommentType[]>) => {
      return {
        ...state,
        comments: action.payload,
        isLoading: false
      }
    },
    failureFetchRecordComments: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload
      }
    },
    requestDeleteRecordComment: (state, action: PayloadAction<RequestDeleteComment>) => {
      return state
    },
    successDeleteRecordComment: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const comments = state.comments.filter(comment => comment.id !== id)
      return {
        ...state,
        comments
      }
    },
    failureDeleteRecordComment: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload
      }
    },
    onChangeRecordDate: (state, action: PayloadAction<Date>) => {
      return {
        ...state,
        trainingDate: action.payload
      }
    }
  }
})

export const {
  addRecord,
  deleteRecord,
  requestDestroyRecord,
  successDestroyRecord,
  failureDestroyRecord,
  initializeRecords,
  updateRecord,
  requestSubmitRecords,
  successSubmitRecords,
  failureSubmitRecords,
  requestFetchRecords,
  successFetchRecords,
  failureFetchRecords,
  requestNextRecords,
  successFetchNextRecords,
  failureFetchNextRecords,
  requestPostRecordComment,
  successPostRecordComment,
  failurePostRecordComment,
  requestFetchRecordComments,
  successFetchRecordComments,
  failureFetchRecordComments,
  requestDeleteRecordComment,
  successDeleteRecordComment,
  failureDeleteRecordComment,
  onChangeRecordDate
} = recordSlice.actions

export default recordSlice
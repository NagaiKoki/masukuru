import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import types
import { 
  RecordState, 
  ResponseRecordType,
  RecordItemType, 
  SuccessFetchRecordType,
  RecordCommentType,
  RequestFetchRecordType,
  RequestSubmitRecords,
  RequestNextRecords,
  RequestPostRecordComment,
  RequestDeleteComment,
  ToggleEmojiModal,
  RequestPostEmojiReaction,
  EmojiReactionType,
  ResponseEmojiReactionType,
  TogglePostedUserEmojiModal,
  ResponseCreateRecordType,
  MentionTargetType
} from '../types/Record'
import { UserType } from '../types/User'
// import constants
import { record } from '../constants/sliceName'
// import utils
import { convertTimeStampToStringOnlyDate } from '../utilities/timestamp'
import RecordData from '../components/Records/Items/data'

const initialState: RecordState = {
  recordItems: [],
  onFreshLoading: false,
  trainingDate: new Date(),
  word: '',
  imageUrl: '',
  error: '',
  isLoading: false,
  recordData: [],
  beforeRecordSize: 0,
  userRecords: [],
  beforeUserRecordSize: 0,
  commentPostError: '',
  comments: [],
  recordSize: 0,
  isOpenApplause: false,
  isEmojiModalOpen: false,
  isPostedEmojiUsersModalOpen: false,
  isPostEmojiUsersLoading: false,
  selectedEmojiRecordId: '',
  selectedEmojiIndex: 0,
  selectedEmojiId: '',
  emojiReactions: [],
  postedEmojiUsers: [],
  commentKeyword: '',
  mentionTargets: []
}

const recordSlice = createSlice({
  name: record,
  initialState,
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
    toggleReflesh: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        onFreshLoading: action.payload
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
        ...initialState
      }
    },
    initializeTemporaryRecord: (state) => {
      return {
        ...state,
        recordItems: [],
        trainingDate: new Date(),
        word: '',
        imageUrl: '',
        error: '',
        isLoading: false,
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
    successSubmitRecords: (state, action: PayloadAction<ResponseCreateRecordType>) => {
      const { record, size } = action.payload
      const isOpenApplause = size <= 31
      const updatedRecordData = [
        record,
        ...state.recordData 
      ]
      return {
        ...state,
        recordItems: [],
        recordData: updatedRecordData,
        word: '',
        imageUrl: '',
        error: '',
        isLoading: false,
        recordSize: size,
        isOpenApplause
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
    requestFetchRecord: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoading: true
      }
    },
    successFetchRecord: (state, action: PayloadAction<ResponseRecordType>) => {
      const responseRecordData = action.payload
      const { records, word, imageUrl, trainingDate, createdAt } = responseRecordData
      const date = trainingDate ? new Date(convertTimeStampToStringOnlyDate(trainingDate)) : new Date(convertTimeStampToStringOnlyDate(createdAt))
      return {
        ...state,
        recordItems: records,
        trainingDate: date,
        word,
        imageUrl,
        isLoading: false
      }
    },
    failureFetchRecord: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false
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
    },
    requestUpdateRecord: (state, action: PayloadAction<RequestSubmitRecords>) => {
      return {
        ...state,
        isLoading: true
      }
    },
    successUpdateRecord: (state, action: PayloadAction<ResponseRecordType>) => {
      const updatedRecords = state.recordData.map((record, i) => {
        if (record.id === action.payload.id) {
          return RecordData[i] = action.payload
        }
        return record
      })
      
      return {
        ...state,
        recordItems: [],
        recordData: updatedRecords,
        word: '',
        imageUrl: '',
        error: '',
        isLoading: false
      }
    },
    failureUpdateRecord: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    },
    closeApplauseModal: (state) => {
      return {
        ...state,
        isOpenApplause: false
      }
    },
    toggleEmojiModalOpen: (state, action: PayloadAction<ToggleEmojiModal>) => {
      const { isOpen, selectedRecordId } = action.payload
      return {
        ...state,
        isEmojiModalOpen: isOpen,
        selectedEmojiRecordId: isOpen ? selectedRecordId : ''
      }
    },
    toggleEmojiPostUserModal: (state, action: PayloadAction<TogglePostedUserEmojiModal>) => {
      const { isOpen, emojiIndex, selectedRecordId, selectedEmojiId } = action.payload
      return {
        ...state,
        isPostedEmojiUsersModalOpen: isOpen,
        selectedEmojiIndex: isOpen ? emojiIndex : 0,
        postedEmojiUsers: isOpen ? state.postedEmojiUsers : [],
        selectedEmojiRecordId: isOpen ? selectedRecordId : '',
        selectedEmojiId: isOpen ? selectedEmojiId : ''
      }
    },
    requestFetchPostedEmojiUsers: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        isPostedEmojiUsersModalOpen: true
      }
    },
    successFetchPostedEmojiUsers: (state, action: PayloadAction<UserType[]>) => {
      return {
        ...state,
        postedEmojiUsers: action.payload,
        isPostEmojiUsersLoading: false
      }
    },
    failureFetchPostedEmojiUsers: (state, action: PayloadAction<string>) => {
      return {
        ...state
      }
    },
    requestFetchEmojiReaction: (state, action: PayloadAction<string>) => {
      return {
        ...state
      }
    },
    successFetchEmojiReaction: (state, action: PayloadAction<EmojiReactionType>) => {
      const emojiReactions = state.emojiReactions.filter(reaction => reaction.recordId !== action.payload.recordId)
      return {
        ...state,
        emojiReactions: [...emojiReactions, action.payload]
      }
    },
    failureFetchEmojiReaction: (state, action: PayloadAction<string>) => {
      return {
        ...state
      }
    },
    requestPostEmojiReaction: (state, action: PayloadAction<RequestPostEmojiReaction>) => {
      return {
        ...state
      }
    },
    successPostEmojiReaction: (state, action: PayloadAction<ResponseEmojiReactionType>) => {
      const recordId = action.payload.recordId
      const { emojiReactions } = state
      const newArray: EmojiReactionType[] = [].concat(emojiReactions)

      const updateReactions = newArray.map((reaction, i) => {
        if (reaction.recordId === recordId) {
          newArray[i] = {
            recordId,
            emojiReactions: [...reaction.emojiReactions, action.payload]
          }
          return newArray[i]
        }
        return reaction
      })

      return {
        ...state,
        emojiReactions: updateReactions
      }
    },
    failurePostEmojiReaction: (state, action: PayloadAction<string>) => {
      return {
        ...state
      }
    },
    requestDeleteEmojiReaction: (state, action: PayloadAction<string>) => {
      return {
        ...state,
      }
    },
    successDeleteEmojiReaction: (state, action: PayloadAction<{ recordId: string, emojiId: string }>) => {
      const { recordId, emojiId } = action.payload
      const newArray: EmojiReactionType[] = [].concat(state.emojiReactions)
      const reactions = newArray.filter(item => item.recordId === recordId)[0]
      const updateReactions = reactions.emojiReactions.filter(reaction => {
        return reaction.id !== emojiId
      })
      const updateEmojiReactions = newArray.map((item, i) => {
        if (item.recordId === recordId) {
          newArray[i] = {
            recordId,
            emojiReactions: updateReactions
          }
          return newArray[i]
        }
        return item
      })

      return {
        ...state,
        emojiReactions: updateEmojiReactions
      }
    },
    failureDeleteEmojiReaction: (state, action: PayloadAction<string>) => {
      return {
        ...state
      }
    },
    changeCommnetKeyword: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        commentKeyword: action.payload
      }
    },
    setMentionTargets: (state, action: PayloadAction<MentionTargetType[]>) => {
      return {
        ...state,
        mentionTargets: action.payload
      }
    }
  }
})

export const {
  addRecord,
  deleteRecord,
  toggleReflesh,
  requestDestroyRecord,
  successDestroyRecord,
  failureDestroyRecord,
  initializeRecords,
  initializeTemporaryRecord,
  updateRecord,
  requestSubmitRecords,
  successSubmitRecords,
  failureSubmitRecords,
  requestFetchRecord,
  successFetchRecord,
  failureFetchRecord,
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
  onChangeRecordDate,
  requestUpdateRecord,
  successUpdateRecord,
  failureUpdateRecord,
  closeApplauseModal,
  toggleEmojiModalOpen,
  toggleEmojiPostUserModal,
  requestFetchPostedEmojiUsers,
  successFetchPostedEmojiUsers,
  failureFetchPostedEmojiUsers,
  requestFetchEmojiReaction,
  successFetchEmojiReaction,
  failureFetchEmojiReaction,
  requestPostEmojiReaction,
  successPostEmojiReaction,
  failurePostEmojiReaction,
  requestDeleteEmojiReaction,
  successDeleteEmojiReaction,
  failureDeleteEmojiReaction,
  changeCommnetKeyword,
  setMentionTargets
} = recordSlice.actions

export default recordSlice
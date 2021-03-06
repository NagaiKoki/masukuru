// import types
import { UserType } from '../User'

export type FirestoreTimestamp = import("firebase").firestore.Timestamp;

export interface RecordState {
  onFreshLoading: boolean
  recordItems: RecordItemType[]
  trainingDate: Date
  word: string
  imageUrl: string
  error: string
  isLoading: boolean
  recordData: ResponseRecordType[]
  beforeRecordSize: number
  userRecords: ResponseRecordType[]
  beforeUserRecordSize: number
  commentPostError: string
  comments: RecordCommentType[]
  recordSize: number,
  isOpenApplause: boolean
  isEmojiModalOpen: boolean
  isPostedEmojiUsersModalOpen: boolean
  isPostEmojiUsersLoading: boolean
  selectedEmojiRecordId: string
  selectedEmojiIndex: number
  selectedEmojiId: string
  emojiReactions: EmojiReactionType[]
  postedEmojiUsers: UserType[]
  commentKeyword: string
  mentionTargets: MentionTargetType[]
}

export type RecordItemType = {
  id: number
  name: string
  set?: number
  amounts?: string[]
  weights?: string[]
  durations?: string[]
  time?: number
  distance?: number
  isMuscle: boolean
}

export type ResponseRecordType = {
  id: string
  records: RecordItemType[]
  word: string
  trainingDate: FirestoreTimestamp | null
  uid: string
  imageUrl: string
  type: 'record' | 'weight' | 'pedometer'
  createdAt: FirestoreTimestamp
  updatedAt: FirestoreTimestamp
}

export type ResponseCreateRecordType = {
  record: ResponseRecordType
  size: number
}


export type RecordCommentType = {
  id: string
  recordId: string
  uid: string
  content: string
  groupId: string
  createdAt: FirestoreTimestamp | Date
  updatedAt: FirestoreTimestamp | Date
}

export type MentionTargetType = {
  id: string
  target: string
}

export type SetMentionTargetType = {
  mentionTargets: MentionTargetType[]
  type: 'reply' | 'comment'
}

export type ResponseEmojiReactionType = {
  id: string
  recordId: string
  groupId: string
  uid: string
  emojiIndex: number
  createdAt: FirestoreTimestamp
  updatedAt: FirestoreTimestamp
}

export type EmojiReactionType = {
  recordId: string
  emojiReactions: ResponseEmojiReactionType[]
}

export type UnitType = number | string

export type SuccessFetchRecordType = {
  payload: ResponseRecordType[]
  uid?: string
  groupId?: string
}

export type RequestSubmitRecords = {
  id?: string
  records: RecordItemType[]
  word: string
  imageUrl: string
}

export type RequestFetchRecordType = {
  uid: string
  groupId: string
  size?: number
}

export type RequestNextRecords = {
  uid?: string
  groupId: string
  lastRecord: ResponseRecordType
}

export type RequestPostRecordComment = {
  recordId: string
  recordUserId: string
  notificationGroupId?: string
  text: string
  mentionIds?: string[]
  type: 'comment' | 'reply'
}

export type RequestDeleteComment = {
  recordId: string
  commentId: string
}

export type ToggleEmojiModal = {
  isOpen: boolean
  selectedRecordId?: string
}

export type TogglePostedUserEmojiModal = {
  isOpen: boolean
  emojiIndex?: number
  selectedRecordId?: string
  selectedEmojiId?: string
}

export type RequestPostEmojiReaction = {
  emojiIndex: number
}
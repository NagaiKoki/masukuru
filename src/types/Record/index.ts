export type FirestoreTimestamp = import("firebase").firestore.Timestamp;

export interface RecordState {
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
  selectedEmojiRecordId: string
  emojiReactions: EmojiReactionType[]
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
  createdAt: FirestoreTimestamp
  updatedAt: FirestoreTimestamp
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
}

export type RequestDeleteComment = {
  recordId: string
  commentId: string
}

export type ToggleEmojiModal = {
  isOpen: boolean
  selectedRecordId?: string
}

export type RequestPostEmojiReaction = {
  emojiIndex: number
}
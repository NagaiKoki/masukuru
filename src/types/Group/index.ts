export type FirestoreTimestamp = import("firebase").firestore.Timestamp;

// import action types
import { 
  REQUEST_FETCH_GROUP_USERS,
  SUCCESS_FETCH_GROUP_USERS,
  FAILURE_FETCH_GROUP_USERS,
  SET_CURRENT_GROUP_ID
} from '../../actions/actionTypes'

// state
export interface GroupState {
  currentGroupId: string
  currentGroup: GroupType
  currentGroupUsers: GroupUserType[]
  belongGroups: GroupType[]
  isLoading: boolean
  error: string
  isJoinModalOpen: boolean
}

export type GroupType = {
  id: string
  inviteCode: string
  groupName: string
  imageUrl: string
  ownerId: string
  createdAt: Date
  updatedAt: Date
}

export type GroupUserType = {
  currentGroupId: string
  imageUrl: string
  name: string
  uid: string
  createdAt: Date
  updatedAt: Date
}

export type RequestPatchGroupType = {
  imageUrl: string
  groupName: string
}
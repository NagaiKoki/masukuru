export type FirestoreTimestamp = import("firebase").firestore.Timestamp;

// state
export interface GroupState {
  currentGroupId: string
  currentGroup: GroupType
  currentGroupUsers: GroupUserType[]
  belongGroups: GroupType[]
  isLoading: boolean
  isJoining: boolean
  isSettingGroup: boolean
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
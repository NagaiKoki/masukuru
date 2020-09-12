export type FirestoreTimestamp = import("firebase").firestore.Timestamp;

export interface ChartState {
  isLoading: boolean
  weights: UserWeightType[]
  error: string
}

export type UserWeightType = {
  weight: number
  date: FirestoreTimestamp
  uid: string
  createdAt: FirestoreTimestamp
  updatedAt: FirestoreTimestamp
}

export type RequestPostWeightType = {
  weight: number
  date: Date
}

export type ChartWeightType = {
  weight: number
  date: Date
}
export type FirestoreTimestamp = import("firebase").firestore.Timestamp;

export interface ChartState {
  isLoading: boolean
  weights: UserWeightType[]
  error: string
}

export type UserWeightType = {
  weight: number
  date: Date
  uid: string
  createdAt: Date | FirestoreTimestamp
  updatedAt: Date | FirestoreTimestamp
}

export type RequestPostWeightType = {
  weight: number
  date: Date
}
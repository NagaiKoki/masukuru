export type FirestoreTimestamp = import("firebase").firestore.Timestamp;

export interface ChartState {
  isLoading: boolean
  weights: UserWeightType[]
  error: string
  weightGoal: number
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

export type RequestFetchChartType = {
  date: Date
  type: ChartTermType
}

export type RequestChartSettingType = {
  weightGoal: number
}

export type ResponseChartSettingType = {
  weightGoal: number
  uid: string
  createdAt: FirestoreTimestamp
  updatedAt: FirestoreTimestamp
}

export type ChartTermType = 'week' | 'month' | 'year'
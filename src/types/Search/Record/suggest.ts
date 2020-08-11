type FirestoreTimestamp = import("firebase").firestore.Timestamp;

export type SuggestRecordType = {
  name: string
  times: number
  createdAt: FirestoreTimestamp | Date
  updatedAt: FirestoreTimestamp | Date
}
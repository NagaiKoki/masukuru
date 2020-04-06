import { Timestamp } from '@firebase/firestore-types'

export interface MenuType {
  uid: string
  name: string
  set: number
  amount1: number
  createdAt: Timestamp
  menuId: string
}
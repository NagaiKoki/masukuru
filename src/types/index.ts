export type RootTabParamList = {
  Home: undefined;
  Mypage: undefined;
}

export type NotificationType = {
  id: string
  title: string
  from: string
  content: string
  createdAt: any
  readUserIds: number[]
}

export type ResponseType<T> = {
  payload?: T
  error?: string
}
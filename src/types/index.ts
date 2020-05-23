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
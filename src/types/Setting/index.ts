export type ResponseSettingType = {
  isCommentPush: boolean,
  isRecordPostPush: boolean
  isEmojiReactionPush: boolean
  visibleWeight: boolean
}

export type SettingType = 'comment' | 'recordPost' | 'emoji' | 'visibleWeight'
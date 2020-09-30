export const LOGIN_ERROR_CODE =  {
  INVALID_EMAIL: "auth/invalid-email",
  INVALID_PASSWORD: "auth/wrong-password",
  USER_NOT_FOUND: "auth/user-not-found",
  TOO_MANY_REQUEST: "auth/too-many-requests",
};

export const LOGIN_ERROR_MESSAGE = {
  INVALID_EMAIL: "メールアドレスを正しく入力してください。",
  INVALID_PASSWORD: "パスワードを正しく入力してください",
  USER_NOT_FOUND: "メールアドレスかパスワードが正しくありません。",
  TOO_MANY_REQUEST: "少しお待ちしてから、もう一度入力してください。",
  DEFAULT_MESSAGE: "エラーが発生しました。しばらく経ってからもう一度お試しください。"
};

export const EMAIL_CLIENT_ERROR_MESSSAGE = {
  EMPTY_ERROR: "メールアドレスを入力してください。",
  INVALID_EMAIL: "メールアドレスを正しく入力してください。",
};

export const PASSWORD_CLIENT_ERROR_MESSAGE = {
  EMPTY_ERROR: "パスワードを入力してください。",
}

export const SIGNUP_ERROR_CODE = {
  EMAIL_DUPLICATED: "auth/email-already-in-use",
  INVALID_EMAIL: "auth/invalid-email",
  TOO_WEAK_PASSWORD: "auth/weak-password",
  TOO_MANY_REQUEST: "auth/too-many-requests",
}

export const SIGNUP_ERROR_MESSAGE = {
  EMAIL_DUPLICATED: "このメールアドレスはすでに使われています。",
  INVALID_EMAIL: "メールアドレスを正しく入力してください。",
  TOO_WEAK_PASSWORD: "より強力なパスワードを入力してください。",
  TOO_MANY_REQUEST: "少しお待ちしてから、もう一度入力してください。",
  DEFAULT_MESSAGE: "エラーが発生しました。しばらく経ってからもう一度お試しください。"
}

export const COMMON_ERROR_MESSSAGE = {
  TRY_AGAIN: '問題が発生しました。しばらくしてから、再度お試しください。'
}

export const INVITE_ERROR_MESSAGE = {
  MORE_THAN_11_USERS: '招待されたグループの人数が11人以上のため、参加することができません。',
  MORE_THAN_5_GROUPS: '所属できるグループは5つまです。',
  SAME_GROUP_CODE: 'この招待コードは、現在所属するグループの招待コードです。',
  EMPTY_GROUP: '入力した招待コードは存在しません。今一度、招待コードをお確かめください。'
}

export const RECORD_ERROR_MESSAGE = {
  EMPTY_NAME: 'トレーニング名を入力してください。',
  EMPTY_AMOUNT: '回数を入力してください。',
  EMPTY_TIME_OR_DISTANCE: '時間か距離のどちらかを入力してください。',
}

export const WEIGHT_FORM_ERROR_MESSAGE = {
  EMPTY_WEIGHT: '体重を入力してください。'
}
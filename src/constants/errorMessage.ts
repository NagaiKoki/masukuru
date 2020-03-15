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
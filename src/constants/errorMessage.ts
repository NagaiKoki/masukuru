export const LOGIN_ERROR_CODE =  {
  INVALID_EMAIL: "auth/invalid-email",
  USER_NOT_FOUND: "auth/user-not-found" || "auth/wrong-password",
  TOO_MANY_REQUEST: "auth/too-many-requests",
};

export const LOGIN_ERROR_MESSAGE = {
  INVALID_EMAIL: "メールアドレスのフォーマットが正しくありません。",
  USER_NOT_FOUND: "メールアドレスかパスワードが正しくありません。",
  TOO_MANY_REQUEST: "少しお待ちしてから、もう一度入力してください。",
  DEFAULT_MESSAGE: "エラーが発生しました。しばらく経ってからもう一度お試しください。"
};

export const EMAIL_CLIENT_ERROR_MESSSAGE = {
  EMPTY_ERROR: "メールアドレスを入力してください。",
  INVALID_EMAIL: "メールアドレスのフォーマットが正しくありません。",
};

export const PASSWORD_CLIENT_ERROR_MESSAGE = {
  EMPTY_ERROR: "パスワードを入力してください。",
}

export const SIGNUP_ERROR_CODE = {

}

export const SIGNUP_ERROR_MESSAGE = {

}
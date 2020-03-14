import { EMAIL_CLIENT_ERROR_MESSSAGE, PASSWORD_CLIENT_ERROR_MESSAGE } from '../constants/errorMessage';

export const emailValidator = (email) => {
  const regex = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return EMAIL_CLIENT_ERROR_MESSSAGE.EMPTY_ERROR;
  if (!regex.test(email)) return EMAIL_CLIENT_ERROR_MESSSAGE.INVALID_EMAIL

  return "";
};

export const passwordValidator = (password) => {
  if (!password || password.length <= 0) return PASSWORD_CLIENT_ERROR_MESSAGE.EMPTY_ERROR;

  return "";
};
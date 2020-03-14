import firebase from 'firebase/app';
import { LOGIN_ERROR_CODE, LOGIN_ERROR_MESSAGE } from '../constants/errorMessage';

export const LogoutUser = () => {
  firebase.auth().signOut();
};

export const LoginUser = async ({ email, password }) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return {};
  } catch(error) {
    switch (error.code) {
      case LOGIN_ERROR_CODE.INVALID_EMAIL:
        return {
          error: LOGIN_ERROR_MESSAGE.INVALID_EMAIL
        };
      case LOGIN_ERROR_CODE.USER_NOT_FOUND:
        return {
          error: LOGIN_ERROR_MESSAGE.USER_NOT_FOUND
        };
      case LOGIN_ERROR_CODE.TOO_MANY_REQUEST:
        return {
          error: LOGIN_ERROR_MESSAGE.TOO_MANY_REQUEST
        };
      default:
        return {
          error: LOGIN_ERROR_MESSAGE.DEFAULT_MESSAGE
        }
    }
  }
}


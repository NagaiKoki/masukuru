import { Alert } from 'react-native'
import firebase from '../../config/firebase'
import Analytics from '../../config/amplitude'
import { 
  COMMON_ERROR_MESSSAGE, 
  LOGIN_ERROR_CODE, 
  LOGIN_ERROR_MESSAGE, 
  SIGNUP_ERROR_CODE, 
  SIGNUP_ERROR_MESSAGE 
} from '../../constants/errorMessage';

export const requestLogin = async (email: string, password: string) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
      Analytics.getUserId(user.user.uid);
      Analytics.track(`email login`)
    })
    return { payload: 'success' }
  } catch (error) {
    switch (error.code) {
      case LOGIN_ERROR_CODE.INVALID_EMAIL:
        return {
          error: LOGIN_ERROR_MESSAGE.INVALID_EMAIL
        };
      case (LOGIN_ERROR_CODE.INVALID_PASSWORD):
        return {
          error: LOGIN_ERROR_MESSAGE.INVALID_PASSWORD
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
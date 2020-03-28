import firebase, { db } from '../config/firebase';
import { AsyncStorage } from 'react-native';
import { LOGIN_ERROR_CODE, LOGIN_ERROR_MESSAGE, SIGNUP_ERROR_CODE, SIGNUP_ERROR_MESSAGE } from '../constants/errorMessage';

export const LogoutUser = async () => {
  await firebase.auth().signOut().then(function() {
    AsyncStorage.removeItem('loginUser');
  })
};

// ログイン
export const LoginUser = async ({ email, password }) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password).then( (user) => {
      
      AsyncStorage.setItem('loginUser', JSON.stringify(user))
    }); 
    return {};
  } catch(error) {
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

// 登録
export const RegisterUser = async ({ email, password }) => {
  try {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
    if (response.user.uid) {
      const uid = response.user.uid
      await db.collection('users').doc(uid).set({ uid: response.user.uid, email: email })
      return {};
    } 
  } catch(error) {
    switch(error.code) {
      case SIGNUP_ERROR_CODE.EMAIL_DUPLICATED:
        return {
          error: SIGNUP_ERROR_MESSAGE.EMAIL_DUPLICATED
        }
      case SIGNUP_ERROR_CODE.INVALID_EMAIL:
        return {
          error: SIGNUP_ERROR_MESSAGE.INVALID_EMAIL
        }
      case SIGNUP_ERROR_CODE.TOO_MANY_REQUEST:
        return {
          error: SIGNUP_ERROR_MESSAGE.TOO_MANY_REQUEST
        };
      case SIGNUP_ERROR_CODE.TOO_WEAK_PASSWORD:
        return {
          error: SIGNUP_ERROR_MESSAGE.TOO_WEAK_PASSWORD
        };
      default: 
        return {
          error: SIGNUP_ERROR_MESSAGE.DEFAULT_MESSAGE
        };
    };
  }
} 

import firebase, { db } from '../config/firebase';
import * as Google from 'expo-google-app-auth';
import { LOGIN_ERROR_CODE, LOGIN_ERROR_MESSAGE, SIGNUP_ERROR_CODE, SIGNUP_ERROR_MESSAGE } from '../constants/errorMessage';
import { GOOGLE_CONFIG } from '../config/firebaseConfig';

export const LogoutUser = async () => {
  await firebase.auth().signOut().then(function() {
  })
};

// ログイン
export const LoginUser = async ({ email, password }) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password).then( (user) => {
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
      await db.collection('users').doc(uid).set({ uid: response.user.uid })
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


// google 認証
export const GoogleLogin = (route) => {
  try {
    Google.logInAsync({
      behavior: 'web',
      iosClientId: GOOGLE_CONFIG.CLIENT_ID,
      iosStandaloneAppClientId: GOOGLE_CONFIG.STANDALONE_CLIENT_ID,
      scopes: ['profile', 'email']
    }).then((result) => {
      if (result.type === 'success') {
        const { idToken, accessToken, user } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase.auth().signInWithCredential(credential).then( async () => {
          const currentUser = firebase.auth().currentUser
          // ユーザーがfirestore上に存在していれば、そのままホームへ遷移させる
          db.collection('users').where('uid', '==', currentUser.uid).get().then(async snapshot => {
            if (snapshot.empty) {
              // チュートリアルの表示判定は名前の存在有無で行っているので、チュートリアルを通すために名前をnullにする
              await currentUser.updateProfile({ displayName: null })
              route.params.setIsChange(true)
              await db.collection('users').doc(currentUser.uid).set({
                uid: currentUser.uid,
                email: currentUser.email
              })
              route.params.setIsChange(false)
            }
          })
        })
      }
    })
  } catch (error) {
    alert(error)
  }
}
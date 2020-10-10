import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import Constants from 'expo-constants'
import firebase, { db } from '../../config/firebase'
import Analytics from '../../config/amplitude'
import {
  COMMON_ERROR_MESSSAGE,
  LOGIN_ERROR_CODE, 
  LOGIN_ERROR_MESSAGE, 
  SIGNUP_ERROR_CODE, 
  SIGNUP_ERROR_MESSAGE 
} from '../../constants/errorMessage';
// import types
import { EmailSignInType } from '../../types/auth'
// import utils
import { factoryNonceGen } from '../../utilities/factoryNonceGen'

// メール認証ログイン or signup
export const requestEmailSingIn = async (args: EmailSignInType) => {
  const { email, password, method } = args
  return await method === 'signin' ? requestEmailLogin(email, password) : requestEmailSignUp(email, password)
}

// メール認証ログイン
const requestEmailLogin = async (email: string, password: string) => {
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

// メール認証サインアップ
const requestEmailSignUp = async (email: string, password: string) => {
  try {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
    if (response.user.uid) {
      const uid = response.user.uid
      await db.collection('users').doc(uid).set({ uid: response.user.uid })
      Analytics.getUserId(uid);
      Analytics.track('email register')
    } 
    return { payload: 'success' }
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

// ログアウト
export const requestLogout = async () => {
  try {
    await firebase.auth().signOut()
    return { payload: 'success' }
  } catch(error) {
    return { error }
  }
};

// google 認証
export const googleLogin = async () => {
  try {
    const result = await Google.logInAsync({
      behavior: 'web',
      iosClientId: Constants.manifest.extra.googleConfig.clientId,
      iosStandaloneAppClientId: Constants.manifest.extra.googleConfig.strageClientId,
      androidClientId: Constants.manifest.extra.googleConfig.androidClientId,
      androidStandaloneAppClientId: Constants.manifest.extra.googleConfig.androidStrageClientId,
      scopes: ['profile', 'email']
    })

    if (result.type === 'success') {
      const { idToken, accessToken, user } = result;
      const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
      await firebase.auth().signInWithCredential(credential).then(async () => {
        const currentUser = firebase.auth().currentUser
        Analytics.getUserId(currentUser.uid);
        Analytics.track('apple auth')
        await db.collection('users').where('uid', '==', currentUser.uid).get().then(async snapshot => {
          if (snapshot.empty) {
            // チュートリアルの表示判定は名前の存在有無で行っているので、チュートリアルを通すために名前をnullにする
            await currentUser.updateProfile({ displayName: null })
            await db.collection('users').doc(currentUser.uid).set({
              uid: currentUser.uid,
              email: currentUser.email
            })
          }
        })
      })
    } else {
      throw new Error(COMMON_ERROR_MESSSAGE.TRY_AGAIN)
    }
    return { payload: 'success' }
  } catch (error) {
    return { error: COMMON_ERROR_MESSSAGE.TRY_AGAIN }
  }
}

// apple認証
export const appleLogin = async () => {
  const nonceString = factoryNonceGen(32)
  try {
    const result = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL
      ],
      state: nonceString
    })

    let provider = new firebase.auth.OAuthProvider("apple.com");
    let credential = provider.credential({
      idToken: result.identityToken,
      rawNonce: nonceString
    });

    await firebase.auth().signInWithCredential(credential).then(async () => {
      const currentUser = firebase.auth().currentUser
      Analytics.getUserId(currentUser.uid);
      Analytics.track('google auth')
      await db.collection('users').where('uid', '==', currentUser.uid).get().then(async snap => {
        if (snap.empty) {
          // チュートリアルの表示判定は名前の存在有無で行っているので、チュートリアルを通すために名前をnullにする
          await currentUser.updateProfile({ displayName: null })
          await db.collection('users').doc(currentUser.uid).set({
            uid: currentUser.uid,
            email: currentUser.email
          })
        }
      })
    })
    return { payload: 'success' }
  } catch {
    return { error: COMMON_ERROR_MESSSAGE.TRY_AGAIN }
  }
}
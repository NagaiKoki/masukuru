import * as firebase from 'firebase';
import 'firebase/firestore';
import Constants from 'expo-constants';

const config = {
  production: {
    apiKey: Constants.manifest.extra.firebaseProductionConfig.apiKey,
    authDomain: Constants.manifest.extra.firebaseProductionConfig.authDomain,
    databaseURL: Constants.manifest.extra.firebaseProductionConfig.databaseURL,
    projectId: Constants.manifest.extra.firebaseProductionConfig.projectId,
    storageBucket: Constants.manifest.extra.firebaseProductionConfig.strageBucket,
  },
  staging: {
    apiKey: Constants.manifest.extra.firebaseStagingConfig.apiKey,
    authDomain: Constants.manifest.extra.firebaseStagingConfig.authDomain,
    databaseURL: Constants.manifest.extra.firebaseStagingConfig.databaseURL,
    projectId: Constants.manifest.extra.firebaseStagingConfig.projectId,
    storageBucket: Constants.manifest.extra.firebaseStagingConfig.strageBucket,
  }

};

if (!firebase.apps.length) {
  __DEV__ ? firebase.initializeApp(config.production) : firebase.initializeApp(config.production)
}

export const db = firebase.firestore();

export default firebase;
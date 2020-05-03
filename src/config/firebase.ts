import * as firebase from 'firebase';
import 'firebase/firestore';
import Constants from 'expo-constants';

const config = {
  apiKey: Constants.manifest.extra.firebaseStagingConfig.apiKey,
  authDomain: Constants.manifest.extra.firebaseStagingConfig.authDomain,
  databaseURL: Constants.manifest.extra.firebaseStagingConfig.databaseURL,
  projectId: Constants.manifest.extra.firebaseStagingConfig.projectId,
  storageBucket: Constants.manifest.extra.firebaseStagingConfig.storageBucket,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const db = firebase.firestore();

export default firebase;
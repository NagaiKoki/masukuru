import * as firebase from 'firebase';
import 'firebase/firestore';
import Constants from 'expo-constants';

const config = {
  apiKey: Constants.manifest.extra.firebaseConfig.apiKey,
  authDomain: Constants.manifest.extra.firebaseConfig.authDomain,
  databaseURL: Constants.manifest.extra.firebaseConfig.databaseURL,
  projectId: Constants.manifest.extra.firebaseConfig.projectId,
  storageBucket: Constants.manifest.extra.firebaseConfig.storageBucket,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const db = firebase.firestore();

export default firebase;
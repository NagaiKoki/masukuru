import * as firebase from 'firebase';
import 'firebase/firestore';
import Constants from 'expo-constants';

const config = {
  apiKey: Constants.manifest.extra.firebaseProductionConfig.apiKey,
  authDomain: Constants.manifest.extra.firebaseProductionConfig.authDomain,
  databaseURL: Constants.manifest.extra.firebaseProductionConfig.databaseURL,
  projectId: Constants.manifest.extra.firebaseProductionConfig.projectId,
  storageBucket: Constants.manifest.extra.firebaseProductionConfig.strageBucket,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const db = firebase.firestore();

export default firebase;
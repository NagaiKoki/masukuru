import * as firebase from 'firebase';
import 'firebase/firestore';
import { CONFIG } from './firebaseConfig';

const config = {
  apiKey: CONFIG.API_KEY,
  authDomain: CONFIG.AUTH_DOMAIN,
  databaseURL: CONFIG.DATABASE_URL,
  projectId: CONFIG.PROJECT_ID,
  storageBucket: CONFIG.STORAGE_BUCKET,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const db = firebase.firestore();

export default firebase;
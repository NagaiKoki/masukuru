import firebase, { db } from '../../config/firebase';

export const requestFetchrecordList = () => {
  const currentUser = firebase.auth().currentUser
  const recordRef = db.collection('users').doc(currentUser.uid).collection('records').get().then( snapshot => {

  })
}
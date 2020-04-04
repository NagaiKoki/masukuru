import firebase, { db } from '../config/firebase';

export const requestTrrainingList = (user: firebase.User, setList: (list: any) => void) => {
  let list = [];
  db.collectionGroup('menus').where('uid', '==', user.uid).get().then( async snapshot => {
    if (snapshot.empty) {
      console.log('no data')
    } else {
      await snapshot.forEach(doc => {
        const data = doc.data()
        list.push(data)
     })
     setList(list)
    }
  })
}
import firebase, { db } from '../config/firebase';

// 現在１人で所属しているグループから、招待されたグループに移動する場合の処理
export const joinInvitedGroup = (invitedCode: string) => {
  const currentUser = firebase.auth().currentUser
  db.collection('groups').where('invideCode', '==', invitedCode).get().then(snapshot => {
    if (snapshot.empty) {
      alert('入力した招待コードは存在しません。今一度、招待コードをお確かめください。')
    } else {
      db.runTransaction(async transaction => {
        const groupUserRef = snapshot.docs[0].ref.collection('groupUsers').doc(currentUser.uid)
        await transaction.set(groupUserRef, {
          uid: currentUser.uid,
          name: currentUser.displayName,
          imageUrl: currentUser.photoURL
        })
        const groupRef = db.collection('groups').doc(currentUser.uid)
        await transaction.delete(groupRef)
      })
    }
  })
}
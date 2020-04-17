import { Alert } from 'react-native';
import firebase, { db } from '../config/firebase';

// 現在１人で所属しているグループから、招待されたグループに移動する場合の処理
export const joinInvitedGroup = (invitedCode: string) => {
  const currentUser = firebase.auth().currentUser
  db.collection('groups').where('inviteCode', '==', invitedCode).get().then(snapshot => {
    if (snapshot.empty) {
      alert('入力した招待コードは存在しません。今一度、招待コードをお確かめください。')
    } else {
      snapshot.docs[0].ref.collection('groupUsers').get().then(snap => {
        if (snap.size >= 5) {
          return Alert.alert('招待されたグループの人数が5人以上のため、参加することができません。別のグループに参加するか、まずは１人で使うを選択してください。')
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
  })
}
import { Alert } from 'react-native';
import firebase, { db } from '../config/firebase';

// 現在１人で所属しているグループから、招待されたグループに移動する場合の処理
export const joinInvitedGroup = async (invitedCode: string, currentGroupId: string) => {
  const currentUser = firebase.auth().currentUser
  let groupId;
  await db.collection('groups').where('inviteCode', '==', invitedCode).get().then( async snapshot => {
    if (snapshot.empty) {
      Alert.alert('入力した招待コードは存在しません。今一度、招待コードをお確かめください。')
    } else if (currentGroupId === snapshot.docs[0].data().ownerId) {
      Alert.alert('この招待コードは、現在所属するグループの招待コードです。')
    } else {
       await snapshot.docs[0].ref.collection('groupUsers').get().then( async snap => {
        if (snap.size >= 5) {
          return Alert.alert('招待されたグループの人数が5人以上のため、参加することができません。別のグループに参加するか、まずは１人で使うを選択してください。')
        } else {
          groupId =  snapshot.docs[0].id
          let batch = db.batch()

          // 現在所属しているgroupUserのcurrentGroupIdを、招待された側のidに切り替える
          await db.collectionGroup('groupUsers').where('uid', '==', currentUser.uid).get().then(snapshot => {
            snapshot.forEach(doc => {
              batch.update(doc.ref, {
                currentGroupId: groupId
              })
            })
          })

          // 招待された側にgroupUserのデータを差し込む
          const groupUserRef = snapshot.docs[0].ref.collection('groupUsers').doc(currentUser.uid)
          batch.set(groupUserRef, {
            uid: currentUser.uid,
            name: currentUser.displayName,
            imageUrl: currentUser.photoURL,
            currentGroupId: groupId
          })

          return batch.commit()
        }
      })
    }
  })
  return groupId
}
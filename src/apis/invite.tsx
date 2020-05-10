import { Alert } from 'react-native';
import firebase, { db } from '../config/firebase';
import Analitycs from '../config/amplitude'
// import constans
import { INVITE_ERROR_MESSAGE } from '../constants/errorMessage'
// import lib
import { isDeveloper } from '../lib/checkDeveloper'

// 現在１人で所属しているグループから、招待されたグループに移動する場合の処理
export const joinInvitedGroup = async (invitedCode: string, currentGroupId: string) => {
  const currentUser = firebase.auth().currentUser
  let groupId: string;
  await db.collection('groups').where('inviteCode', '==', invitedCode).get().then( async snapshot => {
    if (snapshot.empty) {
      Alert.alert(INVITE_ERROR_MESSAGE.EMPTY_GROUP)
    } else if (currentGroupId === snapshot.docs[0].ref.id) {
      Alert.alert(INVITE_ERROR_MESSAGE.SAME_GROUP_CODE)
    } else {
      const groupUsersRef = db.collectionGroup('groupUsers').where('uid', '==', currentUser.uid)
      const snapShotGroupUsers = snapshot.docs[0].ref.collection('groupUsers')
      let groupUsersLength: number;
      let groupsLength: number

      await snapShotGroupUsers.get().then( async snap => {
        groupUsersLength = snap.size
      })

      await groupUsersRef.get().then(async snap => {
        groupsLength = snap.size
      })

      if (groupUsersLength >= 5) {
        return Alert.alert(INVITE_ERROR_MESSAGE.MORE_THAN_5_USERS)
      } else if (groupsLength >= 5 && !isDeveloper(currentUser.uid)) {
        return Alert.alert(INVITE_ERROR_MESSAGE.MORE_THAN_5_GROUPS)
      } else {
        groupId =  snapshot.docs[0].id
        let batch = db.batch()

        // 現在所属しているgroupUserのcurrentGroupIdを、招待された側のidに切り替える
        await groupUsersRef.get().then(snapshot => {
          snapshot.forEach(doc => {
            batch.update(doc.ref, {
              currentGroupId: groupId
            })
          })
        })

        // 招待された側にgroupUserのデータを差し込む
        const groupUserRef = snapShotGroupUsers.doc(currentUser.uid)
        batch.set(groupUserRef, {
          uid: currentUser.uid,
          name: currentUser.displayName,
          imageUrl: currentUser.photoURL,
          currentGroupId: groupId
        })

        Analitycs.track('join group')
        return batch.commit()
      }
    }
  })
  return groupId
}
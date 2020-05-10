import { Alert } from 'react-native';
import firebase, { db } from '../../config/firebase';
// import lib
import { factoryRandomCode } from '../../lib/randomTextFactory';
// import constans
import { COMMON_ERROR_MESSSAGE, INVITE_ERROR_MESSAGE } from '../../constants/errorMessage'

//  １人のグループを作成
export const createGroup = async (navigation?: any, route?: any, userName?: string) => {
  try {
    const groupRef = db.collection('groups')
    const currentUser = firebase.auth().currentUser
    let name = userName ? userName : currentUser.displayName
    const TemporaryGroupId = factoryRandomCode(28)
    let batch = db.batch()

    await groupRef.doc(TemporaryGroupId).set({
      ownerId: currentUser.uid,
      name: name
    })
   
    await currentUser.updateProfile({ displayName: name })
    await createGroupUser(currentUser, TemporaryGroupId, batch)
    await updateCurrentGroupId(TemporaryGroupId, currentUser.uid, batch)
    await saveInvideCode(TemporaryGroupId, batch)

  batch.commit().then(() => {
    if (!!route && !!route.params.setIsChange) {
      route.params.setIsChange(true)
      navigation.navigate('home', { currentGroupId: TemporaryGroupId })
      route.params.setIsChange(false)
    };
  })

  return TemporaryGroupId;
   
  } catch (error) {
    Alert.alert(COMMON_ERROR_MESSSAGE.TRY_AGAIN)
  }
}

// グループ配下に自身のグループユーザーを作成
const createGroupUser = async (currentUser: firebase.User, TemporaryGroupId: string, batch: any) => {
  const groupRef = db.collection('groups')

  await batch.set(groupRef.doc(TemporaryGroupId).collection('groupUsers').doc(currentUser.uid), {
    uid: currentUser.uid,
    name: currentUser.displayName,
    imageUrl: currentUser.photoURL,
    currentGroupId: TemporaryGroupId
  })
}

// 現在所属しているグループのcurrentGroupIdを更新する
const updateCurrentGroupId = async (TemporaryGroupId: string, uid: string, batch: any) => {
  const groupUsersRef = db.collectionGroup('groupUsers').where('uid', '==', uid)
  await groupUsersRef.get().then(snap => {
    snap.forEach(doc => {
      batch.update(doc.ref, {
        currentGroupId: TemporaryGroupId
      })
    })
  })
}
 
// 招待コードを保存する
const saveInvideCode = async (TemporaryGroupId: string, batch: any) => {
  const groupRef = db.collection('groups')
  const inviteCode = factoryRandomCode(6);
  await groupRef.where('inviteCode', '==', inviteCode).get()
  .then( async snapshot => {
    if (snapshot.empty) {
      await batch.update(groupRef.doc(TemporaryGroupId), {
        inviteCode: inviteCode
      })
    } else {
      // まずないが、ランダムな生成コードが他のグループと被った場合に、再帰処理をする
      saveInvideCode(TemporaryGroupId, batch);
    };
  })
};
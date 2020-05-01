import { Alert } from 'react-native';
import firebase, { db } from '../../config/firebase';
// import lib
import { factoryRandomCode } from '../../lib/randomTextFactory';
// import constans
import { COMMON_ERROR_MESSSAGE, INVITE_ERROR_MESSAGE } from '../../constants/errorMessage'

//  １人のグループを作成
export const createGroup = async (navigation?: any, route?: any) => {
  try {
    const groupRef = db.collection('groups')
    const currentUser = firebase.auth().currentUser
  
    await groupRef.doc(currentUser.uid).set({
      ownerId: currentUser.uid,
      name: currentUser.displayName
    }).then(() => {
      createGroupUser(currentUser)
    }).then(() => {
      saveInvideCode(currentUser)
    }).then((snapshot) => {
      if (!!route) {
        route.params.setIsChange(true)
        navigation.navigate('home', { currentGroupId: currentUser.uid })
        route.params.setIsChange(false)
      }
    })
    
  } catch (error) {
    Alert.alert(COMMON_ERROR_MESSSAGE.TRY_AGAIN)
  }
}

// グループ配下に自身のグループユーザーを作成
const createGroupUser = (currentUser: firebase.User) => {
  const groupRef = db.collection('groups')
  groupRef.doc(currentUser.uid).collection('groupUsers').doc(currentUser.uid).set({
    uid: currentUser.uid,
    name: currentUser.displayName,
    imageUrl: currentUser.photoURL,
    currentGroupId: currentUser.uid
  })
}

// 招待コードを保存する
const saveInvideCode = (currentUser: firebase.User) => {
  const groupRef = db.collection('groups')
  const inviteCode = factoryRandomCode(6);
  groupRef.where('inviteCode', '==', inviteCode).get()
  .then(snapshot => {
    if (snapshot.empty) {
      groupRef.doc(currentUser.uid).update({
        inviteCode: inviteCode
      })
    } else {
      // まずないが、ランダムな生成コードが他のグループと被った場合に、再帰処理をする
      saveInvideCode(currentUser);
    };
  })
};
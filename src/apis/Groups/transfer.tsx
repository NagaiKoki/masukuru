import React, { useState } from 'react';
import firebase, { db } from '../../config/firebase';
import { Alert } from 'react-native'
// import constants
import { COMMON_ERROR_MESSSAGE } from '../../constants/errorMessage'

const requestBelongsGroupIds = async () => {
  const currrentUser = firebase.auth().currentUser
  let belongGroupIds = [];

  await db.collectionGroup('groupUsers').where('uid', '==', currrentUser.uid).get()
  .then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      belongGroupIds.push(doc.ref.parent.parent.id)
    })
  })
  return belongGroupIds
}


// const requestBelongGroup = async (groupIds: string[]) => {
//   let groups = []
//   await Promise.all(groupIds.map( async id => {
//     await db.collection('groups').doc(id).get().then( async doc => {
//       if (!doc.exists) {
//         return;
//       } else {
//         let groupData = doc.data()
//         groupData.id = doc.ref.id
//         const users = await requestGroupUsers(id)
//         groupData.users = users
//         groups.push(groupData)
//       }
//     })
//   }))
//   return groups
// }

// // 所属しているグループ一覧取得
// export const requestBelongGroups = async () => {
//   const belongGroupIds = await requestBelongsGroupIds()
//   const belongGroups = await requestBelongGroup(belongGroupIds)
//   return belongGroups
// }

export const requestTransfer = async (groupId: string) => {
  const currentUser = firebase.auth().currentUser
  try {
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
    const groupUserRef = db.collection('groups').doc(groupId).collection('groupUsers').doc(currentUser.uid)
    batch.set(groupUserRef, {
      uid: currentUser.uid,
      name: currentUser.displayName,
      imageUrl: currentUser.photoURL,
      currentGroupId: groupId
    })

    return batch.commit()
  } catch (error) {
    Alert.alert(COMMON_ERROR_MESSSAGE.TRY_AGAIN)
  }
}

// currentGroupIdを渡す
export const requestCurrentGroupId = async () => {
  let currentGroupId;
  const currentUser = firebase.auth().currentUser
  
  await db.collectionGroup('groupUsers').where('uid', '==', currentUser.uid).get().then(snap => {
    snap.forEach(doc => {
      currentGroupId = doc.data().currentGroupId
    })
  })
  return currentGroupId
}
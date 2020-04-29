import React, { useState } from 'react';
import firebase, { db } from '../../config/firebase';
import { log } from 'react-native-reanimated';

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

const requestGroupUsers = async (groupId) => {
  let users = []
  const groupRef = db.collection('groups').doc(groupId)
  await groupRef.collection('groupUsers').get().then(querySnapshot => {
    if (!querySnapshot) {
      return [];
    } else {
      querySnapshot.docs.forEach(user => {
        users.push(user.data())
      })
    }
  })
  // console.log(users)
  return users
}

const requestBelongGroup = async (groupIds: string[]) => {
  let groups = []
  await Promise.all(groupIds.map( async id => {
    await db.collection('groups').doc(id).get().then( async doc => {
      if (!doc.exists) {
        return;
      } else {
        let groupData = doc.data()
        const users = await requestGroupUsers(id)
        groupData.users = users
        groups.push(groupData)
      }
    })
  }))
  return groups
}

const requestBelongGroups = async () => {
  const belongGroupIds = await requestBelongsGroupIds()
  const belongGroups = await requestBelongGroup(belongGroupIds)
  return belongGroups
}

export default requestBelongGroups;
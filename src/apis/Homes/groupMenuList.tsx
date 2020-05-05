import { Dispatch, SetStateAction } from 'react'
import firebase, { db } from '../../config/firebase';
import { MenuType } from '../../types/menu';

const getGroupUsers = async (groupId) => {
  let users = []
  const snapshot = await db.collection('groups').doc(groupId).collection('groupUsers').get()
  snapshot.forEach(doc => {
    users.push(doc.data())
  })
  return users
}

const getUsersMenus = async (users) => {
  let menus = []
  await Promise.all(users.map(async user => {
    const snapshot = await db.collectionGroup('menus').where('uid', '==', user.uid).get()
    snapshot.forEach(doc => {
      menus.push(doc.data())
    })
  }))
  return menus
}

const categoryMenuListSort = (list) => {
  list.sort(function(a,b){
    if(a.createdAt > b.createdAt) return -1;
    if(a.createdAt < b.createdAt) return 1;
    return 0;
  })
}

export const requestGroupMenuList = async (setMenuList: Dispatch<SetStateAction<MenuType[]>>, setIsLoading?: any, currentGroupId?: string) => {
  const groupUsers = await getGroupUsers(currentGroupId);
  let usersMenus = await getUsersMenus(groupUsers);
  categoryMenuListSort(usersMenus)
  setMenuList(usersMenus.slice(0, 4))
  setIsLoading(false)
}
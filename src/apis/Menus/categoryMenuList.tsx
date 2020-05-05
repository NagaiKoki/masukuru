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

const getUsersCategoryEvents = async (users, category) => {
  let events = []
  await Promise.all(users.map(async user => {
    const snapshot = await db.collection('users').doc(user.uid).collection('events').where('category', '==', category).get()
    snapshot.forEach(doc => {
      events.push(doc.data())
    })
  }))
  return events
}

const getCategoryMenus = async (events) => {
  let menus = []
  await Promise.all(events.map(async event => {
    const snapshot = await db.collectionGroup('menus').where('eventId', '==', event.id).get()
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

export const requestCategroyMenuList = async (setList: Dispatch<SetStateAction<MenuType[]>>, setIsLoading?: any, user?: firebase.User, currentGroupId?: string, item?: any) => {
  const groupUsers = await getGroupUsers(currentGroupId);
  const usersCategoryEvents = await getUsersCategoryEvents(groupUsers, item.category)
  let categoryMenus = await getCategoryMenus(usersCategoryEvents)
  categoryMenuListSort(categoryMenus)
  setList(categoryMenus)
  setIsLoading(false)
}
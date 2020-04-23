import { Dispatch, SetStateAction } from 'react'
import firebase, { db } from '../config/firebase';
import { MenuType } from '../types/menu';

export const requestMenuList = (setList: Dispatch<SetStateAction<MenuType[]>>, setIsLoading?: any, user?: firebase.User, isShowPage?: boolean, currentGroupId?: string, item?: any) => {
  try {
    let listArray = []
    let query;
    let documents;
    if (isShowPage) {
      documents = db.collectionGroup('menus').where('groupId', '==', currentGroupId).where('name', '==', item.name) 
    } else {
      documents = db.collectionGroup('menus').where('uid', '==', user.uid)
    }
    query = documents.orderBy('createdAt', 'desc')
    
    query.get().then(snapshot  => {
      if (snapshot.empty) {
        setIsLoading(false)
      } else {
        snapshot.forEach(doc => {
          const data = doc.data()
          listArray.push(data)
        })
        setIsLoading(false)
        return setList(listArray)
      }
      })
    } catch(error) {
      alert('データの取得に失敗しました。時間をおいてから再度お試しください。')
    }
  }
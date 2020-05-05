import { Dispatch, SetStateAction } from 'react'
import firebase, { db } from '../config/firebase';
import { MenuType } from '../types/menu';

export const requestMenuList = async (user?: firebase.User, item?: any) => {
  let listArray = []
  let query;
  let documents;
  try {
    if (!!item) {
      documents = db.collectionGroup('menus').where('uid', '==', user.uid).where('eventId', '==', item.id)
    } else {
      documents = db.collectionGroup('menus').where('uid', '==', user.uid)
    }
  
    query = documents.orderBy('createdAt', 'desc')
    
    await query.get().then(snapshot  => {
      if (snapshot.empty) {
        return;
      } else {
        snapshot.forEach(doc => {
          const data = doc.data()
          listArray.push(data)
        })
      }
      })
      console.log('fdsaf')
      return listArray
    } catch(error) {
      console.log(error)
      alert('データの取得に失敗しました。時間をおいてから再度お試しください。')
    }
  }
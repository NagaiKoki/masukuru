import { Dispatch, SetStateAction } from 'react'
import firebase, { db } from '../config/firebase';
import { MenuType } from '../types/menu';

export const requestMenuList = (user: firebase.User, setList: (list: MenuType[]) => void, isShowPage?: boolean, item?: any) => {
  try {
    let listArray = []
    let query;
    let documents;
    if (isShowPage) {
      // TODO: グループIDが取るのに必要
      documents = db.collectionGroup('menus').where('uid', '==', user.uid).where('name', '==', item.name) 
    } else {
      documents = db.collectionGroup('menus').where('uid', '==', user.uid)
    }
    query = documents.orderBy('createdAt', 'desc')
    
    query.get().then(snapshot  => {
      if (snapshot.empty) {
        console.log('no data')
      } else {
        snapshot.forEach(doc => {
          const data = doc.data()
          listArray.push(data)
        })
        return setList(listArray)
      }
      })
    } catch(error) {
      console.log(error)
      alert('データの取得に失敗しました。時間をおいてから再度お試しください。')
    }
  }
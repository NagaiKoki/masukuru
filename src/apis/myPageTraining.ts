import { Dispatch, SetStateAction } from 'react'
import firebase, { db } from '../config/firebase';
import { MenuType } from '../types/menu';

export const requestMenuList = (user: firebase.User, 
                                setList: (list: MenuType[]) => void, 
                                setIsLastMenu: Dispatch<SetStateAction<boolean>>,
                                setIsFirstMenu?: Dispatch<SetStateAction<boolean>>,
                                setPreviousItem?: Dispatch<SetStateAction<MenuType[]>>,
                                list?: MenuType[], 
                                clickMessage?: string) => {
  try {
    let listArray = []
    let query;
    const documents = db.collectionGroup('menus').where('uid', '==', user.uid)
    if (clickMessage === 'next') {
      // 表示されるメニューリストの最後をキーとして、それ以降のメニューを取得するクエリを生成
      // 次のボタンを押されたら、戻れるように前回のstateをセットする
      query = documents.orderBy('createdAt', 'desc').startAfter(list[list.length - 1].createdAt)
      // setPreviousItem(list)
    } else {
      query = documents.orderBy('createdAt', 'desc')
    }

    // 一旦テスト用で2件まで
    // TODO 修正
    query.get().then(snapshot  => {
      if (snapshot.empty) {
        console.log('no data')
      } else {
        snapshot.forEach(doc => {
          const data = doc.data()
          listArray.push(data)
        })

        // if (!!list && list[0].menuId === )
        

        // 最後のページの場合、次へのボタンは見せないようにする
        // if (clickMessage === 'next') {
        //   documents.orderBy('createdAt', 'asc').limit(1).get().then(snapshot => {
        //     if (snapshot.empty) return;
        //     if (snapshot.docs[0].data().menuId === listArray[listArray.length - 1].menuId) {
        //       setIsLastMenu(true)
        //     }
        //   })
        // }
        return setList(listArray)
      }
      })
    } catch(error) {
      console.log(error)
      alert('データの取得に失敗しました。時間をおいてから再度お試しください。')
    }
  }
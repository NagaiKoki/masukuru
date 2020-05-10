import { Dispatch, SetStateAction } from 'react'
import { db } from '../../config/firebase';
// import types
import { GroupUserType } from '../../types/user'

export const getMemberList = async (groupId: string, setUserList: Dispatch<SetStateAction<GroupUserType[]>>) => {
  let list = []
  await db.collection('groups').doc(groupId).collection('groupUsers').get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const data = doc.data()
      list.push(data)
    })
    setUserList(list)
  }).catch(error => {
    console.log("Error getting documents: ", error);
  })
}
import firebase, { db } from '../../config/firebase';
// import constants
import { COMMON_ERROR_MESSSAGE } from '../../constants/errorMessage'
// import types
import { GroupUserType } from '../../types/User'

export interface GroupInfoResponse {
  groupName: string
  imageUrl: string
  owner: Owner
}

type Owner = {
  name: string
  imageUrl: string
  uid: string
}

export const getGroupInfo = async (currentGroupId) : Promise<GroupInfoResponse> => {
  const groupRef = db.collection('groups').doc(currentGroupId)
  let responseInfo = { groupName: '', imageUrl: '', owner: { name: '', imageUrl: '', uid: '' } };
  let owner: Owner = { name: '', imageUrl: '', uid: '' }

  await groupRef.get().then(async snap => {
    const name = snap.data().groupName
    const ownerId = snap.data().ownerId
    const imageUrl = snap.data().imageUrl
    responseInfo.groupName = !!name ? name : ''
    responseInfo.imageUrl = !!imageUrl ? imageUrl : ''

    await db.collection('users').doc(ownerId).get().then(snap => {
      const ownerData = snap.data()
      owner.name = ownerData.name
      owner.imageUrl = ownerData.imageUrl
      owner.uid = ownerData.uid
      responseInfo.owner = owner
    })
  })

  return responseInfo;
}

export const requestFetchGroupUserIds = async () => {
  const currentUserId = firebase.auth().currentUser.uid
  const groupUserRef = db.collectionGroup('groupUsers').where('uid', '==', currentUserId).get()
  let belongGroupIds = []
  let groupUserIds = []
  
  try {
    await groupUserRef.then(snap => {
      snap.forEach(doc => {
        belongGroupIds.push(doc.ref.parent.parent.id)
      })
    })

    await Promise.all(belongGroupIds.map(async id => {
      await db.collection('groups').doc(id).collection('groupUsers').get().then(snap => {
        snap.forEach(doc => {
          const groupUser = doc.data() as GroupUserType
          groupUserIds.push(groupUser.uid)
        })
      })
    }))

    const ids = Array.from(new Set(groupUserIds))
    return { payload: ids }
  
  } catch(error) {
    console.log(error)
    return { error: COMMON_ERROR_MESSSAGE.TRY_AGAIN }
  }
}
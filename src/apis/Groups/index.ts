import { db } from '../../config/firebase';

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
import { Alert } from 'react-native';
import firebase, { db } from '../../config/firebase';
// import constants
import { COMMON_ERROR_MESSSAGE } from '../../constants/errorMessage'

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

export const requestEditGroup = async (currentGroupId: string, name: string, temporaryUrl: string) => {
  const groupRef = db.collection('groups').doc(currentGroupId)
  try {
    await groupRef.update({
      groupName: name,
      imageUrl: temporaryUrl
    })
    return;
  } catch (error) {
    Alert.alert(COMMON_ERROR_MESSSAGE.TRY_AGAIN)
  }
}

export const requestGroupUserImage = async (groupId: string) => {
  let groupUserImages = []
  await db.collection('groups').doc(groupId).collection('groupUsers').get().then(snap => {
    snap.forEach(user => {
      groupUserImages.push(user.data().imageUrl)
    })
  })
  return groupUserImages;
}
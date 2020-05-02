import { Alert } from 'react-native';
import firebase, { db } from '../../config/firebase';
// import constants
import { COMMON_ERROR_MESSSAGE } from '../../constants/errorMessage'

export interface GroupInfoResponse {
  groupName: string
  owner: Owner
}

type Owner = {
  name: string
  imageUrl: string
  uid: string
}

export const getGroupInfo = async (currentGroupId) : Promise<GroupInfoResponse> => {
  const groupRef = db.collection('groups').doc(currentGroupId)
  let responseInfo = { groupName: '', owner: { name: '', imageUrl: '', uid: '' } };
  let owner: Owner = { name: '', imageUrl: '', uid: '' }

  await groupRef.get().then(async snap => {
    const name = snap.data().groupName
    const ownerId = snap.data().ownerId
    responseInfo.groupName = !!name ? name : ''

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

export const requestEditGroup = async (currentGroupId: string, name: string) => {
  const groupRef = db.collection('groups').doc(currentGroupId)
  try {
    await groupRef.update({
      groupName: name
    })
    return;
  } catch (error) {
    Alert.alert(COMMON_ERROR_MESSSAGE.TRY_AGAIN)
  }
}
import { Alert } from 'react-native';
import { db } from '../../config/firebase';
// import constants
import { COMMON_ERROR_MESSSAGE } from '../../constants/errorMessage'

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
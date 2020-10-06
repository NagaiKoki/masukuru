import firebase, { db } from '../../../config/firebase'
// import utils
import { factoryRandomCode } from '../../../utilities/randomTextFactory'
// import types
import { GroupType, GroupUserType } from '../../../types/Group'
import { UserType } from '../../../types/User'

// 1人のグループを作成
export const requestPostCreateGroup = async (currentUser: UserType) => {
  const currentUserId = currentUser.uid
  const inviteCode = factoryRandomCode(6)
  const checkedCode = await requestCheckInviteCode(inviteCode)
  const temporaryGroupId = factoryRandomCode(28)
  const groupRef = db.collection('groups').doc(temporaryGroupId)
  const groupUserRef = db.collection('groups').doc(temporaryGroupId).collection('groupUsers').doc(currentUserId)
  const { imageUrl, name } = currentUser
  let batch = db.batch()

  const groupObj: GroupType = {
    id: temporaryGroupId,
    ownerId: currentUserId,
    imageUrl: '',
    inviteCode: checkedCode,
    groupName: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const groupUserType: GroupUserType = {
    imageUrl,
    name,
    currentGroupId: temporaryGroupId,
    uid: currentUserId,
    createdAt: new Date(),
    updatedAt: new Date()
  } 

  try {
    batch.set(groupRef, groupObj)
    batch.set(groupUserRef, groupUserType)
    await batch.commit()

    return { payload: groupObj }
  } catch(error) {
    return { error }
  }
}

// 招待コードが他で使用されていれば、新しい招待コードを生成
const requestCheckInviteCode = async (code: string): Promise<string> => {
  const groupRef = db.collection('groups').where('inviteCode', '==', code)
  let newCode: string = ''

  try {
    await groupRef.get().then(snap => {
      if (snap.empty) {
        newCode = factoryRandomCode(6)
      }
    })
    return newCode || code
  } catch(error) {
    return code
  }
}
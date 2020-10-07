import firebase, { db } from '../../../config/firebase'
// import utils
import { factoryRandomCode } from '../../../utilities/randomTextFactory'
// import types
import { GroupType, GroupUserType } from '../../../types/Group'
import { UserType } from '../../../types/User'
// import constants
import { INVITE_ERROR_MESSAGE, COMMON_ERROR_MESSSAGE } from '../../../constants/errorMessage'

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
    await requestPatchCurrentGroupId(temporaryGroupId, currentUser, batch)
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

// グループに参加する
export const requestPatchJoinGroup = async (code: string, currentUser: UserType) => {
  const groupRef = db.collection('groups').where('inviteCode', '==', code)
  const { uid, imageUrl, name } = currentUser
  let invitedGroup: GroupType

  try {
    // グループの取得
    await groupRef.get().then(snap => {
      if (snap.empty) {
        throw new Error(INVITE_ERROR_MESSAGE.EMPTY_GROUP)
      } else {
        snap.forEach(doc => {
          const data = doc.data() as GroupType
          data.id = doc.id
          invitedGroup = data
        })
      }
    })

    // 参加できるかチェックを行う
    const { error } = await requestCheckEnableJoinGroup(invitedGroup.id)
    if (error) {
      throw new Error(error)
    } else {
      const invitedGroupUserRef = db.collection('groups').doc(invitedGroup.id).collection('groupUsers')
      const groupUserObj: GroupUserType = {
        name,
        imageUrl,
        uid,
        currentGroupId: invitedGroup.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      await invitedGroupUserRef.doc(uid).set(groupUserObj)
    }
    return { payload: invitedGroup }
  } catch(error) {
    return { error: error.message }
  }
}

// グループに所属できるかのチェック処理
const requestCheckEnableJoinGroup = async (groupId: string) => {
  const groupUserRef = db.collection('groups').doc(groupId).collection('groupUsers')
  const collectionGroupUserRef = db.collectionGroup('groupUsers').where('uid', '==', firebase.auth().currentUser.uid)

  try {
    // 招待先のグループが11人以上の場合
    await groupUserRef.get().then(snap => {
      if (snap.size > 2) {
        throw new Error(INVITE_ERROR_MESSAGE.MORE_THAN_11_USERS)
      }
    })

    // 現在所属しているグループが5つ以上の場合
    await collectionGroupUserRef.get().then(snap => {
      if (snap.size >= 5) {
        throw new Error(INVITE_ERROR_MESSAGE.MORE_THAN_5_GROUPS)
      }
    })

    // すでに招待コードのグループに所属している場合
    await groupUserRef.get().then(snap => {
      snap.forEach(doc => {
        const data = doc.data() as GroupUserType
        const currentUserId = firebase.auth().currentUser.uid
        if (data.uid === currentUserId) {
          throw new Error(INVITE_ERROR_MESSAGE.SAME_GROUP_CODE)
        }
      })
    })
    return { payload: 'success' }
  } catch (error) {
    return { error: error.message }
  }
}

// 現在所属しているグループをフェッチ
export const requestFetchCurrentGroupId = async () => {
  const currentUserId = firebase.auth().currentUser.uid
  const groupUserRef = db.collectionGroup('groupUsers').where('uid', '==', currentUserId)
  const groupRef = db.collection('groups')
  let currentGroupId: string
  let currentGroup: GroupType

  try {
    await groupUserRef.get().then(snap => {
      if (snap.empty) {
        throw new Error(COMMON_ERROR_MESSSAGE.TRY_AGAIN)
      } else {
        snap.forEach(doc => {
          const data = doc.data() as GroupUserType
          currentGroupId = data.currentGroupId
        })
      }
    })

    await groupRef.doc(currentGroupId).get().then(snap => {
      const data = snap.data() as GroupType
      data.id = snap.id
      currentGroup = data
    })
    
    return { payload: currentGroup }
  } catch(error) {
    return { error: error.message }
  }
}

// 現在所属しているグループのユーザーを取得
export const requestFetchGetCurrentGroupUsers = async (groupId: string) => {
  const groupUserRef = db.collection('groups').doc(groupId).collection('groupUsers')
  let groupUsers: GroupUserType[] = []

  try {
    await groupUserRef.get().then(snap => {
      snap.forEach(doc => {
        const data = doc.data() as GroupUserType
        groupUsers.push(data)
      })
    })
    return { payload: groupUsers }
  } catch(error) {
    return { error }
  }
}

// 所属しているグループ一覧を取得
export const requestFetchGetBelongGroups = async () => {
  const currentUserId = firebase.auth().currentUser.uid
  const groupUserRef = db.collectionGroup('groupUsers').where('uid', '==', currentUserId)
  let groupIds: string[] = []
  let groups: GroupType[] = []

  try {
    await groupUserRef.get().then(snap => {
      snap.forEach(doc => {
        groupIds.push(doc.ref.parent.parent.id)
      })
    })

    await Promise.all(groupIds.map(async id => {
      await db.collection('groups').doc(id).get().then(snap => {
        const data = snap.data() as GroupType
        data.id = id
        groups.push(data)
      })
    }))

    return { payload: groups }
  } catch(error) {
    return { error }
  }
}

// もしグループ画像 or 名前がない場合に、叩く
// local stateに格納する
export const requestGroupUsers = async (groupId: string) => {
  const groupRef = db.collection('groups').doc(groupId)
  let groupUsers: GroupUserType[] = []

  try {
    await groupRef.collection('groupUsers').get().then(snap => {
      if (snap.empty) {
        throw new Error(COMMON_ERROR_MESSSAGE.TRY_AGAIN)
      } else {
        snap.docs.forEach(user => {
          const data = user.data() as GroupUserType
          groupUsers.push(data)
        })
      }
    })
    return { payload: groupUsers }
  } catch(error) {
    return { error: error.message }
  }
}

// グループ移動後に、groupUsersのCurrentGroupIdを上書きする
export const requestPatchCurrentGroupId = async (currentGroupId: string, currentUser: UserType, batch?: firebase.firestore.WriteBatch) => {
  const currentUserId = firebase.auth().currentUser.uid
  const groupUserRef = db.collectionGroup('groupUsers').where('uid', '==', currentUserId)

  try {
    await groupUserRef.get().then(snap => {
      if (snap.empty) {
        throw new Error(COMMON_ERROR_MESSSAGE.TRY_AGAIN)
      } else [
        snap.forEach(doc => {
          if (batch) {
            batch.set(doc.ref, { ...currentUser, currentGroupId })
          } else {
            doc.ref.update({ ...currentUser, currentGroupId })
          }
        })
      ]
    })
    return { payload: 'success' }
  } catch(error) {
    return { error: error.message }
  }
}
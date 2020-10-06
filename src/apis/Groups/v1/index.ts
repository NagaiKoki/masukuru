import firebase, { db } from '../../../config/firebase'

export const requestPostCreateGroup = async () => {
  const groupRef = db.collection('groups')
}

const requestCheckInviteCode = (code: string) => {
  const groupRef = db.collection('groups').where('inviteCode', '==', code).get()

  try {

  } catch(error) {

  }
}
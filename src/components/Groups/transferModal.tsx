import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components';
import Modal from 'react-native-modal';
import { COLORS } from '../../constants/Styles';
// import component
import Loading from '../Loading'
// import apis
import requestBelongGroups from '../../apis/Groups/transfer'

interface TransferModalProps {
  showTransferModal: boolean
}

type responseGroupType = {
  inviteCode: string
  name: string
  ownerId: string
  users: Users[]
}

type Users = {
  imageUrl: string
  name: string
  uid: string
}

const TranferModal = (props: TransferModalProps) => {
  const [isloading, setIsloading] = useState(false)
  const [groups, setGroups] = useState<responseGroupType[]>([])
  const { showTransferModal } = props

  useEffect(() => {
    getBelongGroups()
    setIsloading(false)
  }, [])

  const getBelongGroups = async () => {
    const groups = await requestBelongGroups()
    setGroups(groups)
    return;
  }

  if (isloading) {
    return (
      <Loading size="small" />
    )
  }
  const renderGroups = (
    groups.length && groups[0].users.length ? (
      groups.map(group => {
        let userNames = ""
        group.users.map(user => {
          userNames += user.name + " "
        })
        return <GroupNameText key={group.ownerId}>{userNames}</GroupNameText>
      })
    ) : (
      null
    )
  )

  return (
    <Modal isVisible={showTransferModal}>
      <Container>
        <TransferTitle>グループを切り替える</TransferTitle>
        {renderGroups}
      </Container>
    </Modal>
  )
}

export default TranferModal;

const Container = styled.View`
  max-height: 300px;
  position: absolute;
  bottom: -20px;
  width: 110%;
  border-radius: 10px;
  padding: 0 10px;
  height: 320px;
  background-color: ${COLORS.BASE_BACKGROUND};
  align-self: center;
`

const TransferTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 20px 0;
  color: ${COLORS.BASE_BLACK};
`

const GroupContainer = styled.View`
`

const GroupNameText = styled.Text`
`
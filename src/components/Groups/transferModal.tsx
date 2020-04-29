import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components';
import Modal from 'react-native-modal';
import { COLORS } from '../../constants/Styles';
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/FontAwesome'
// import component
import Loading from '../Loading'
// import apis
import requestBelongGroups from '../../apis/Groups/transfer'
// import lib
import truncateText from '../../lib/truncateText'

interface TransferModalProps {
  showTransferModal: boolean
  currentGroupId: string
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
  const { showTransferModal, currentGroupId } = props

  useEffect(() => {
    getBelongGroups()
    setIsloading(false)
  }, [])

  const getBelongGroups = async () => {
    const groups = await requestBelongGroups()
    setGroups(groups)
    return;
  }

  if (isloading || !currentGroupId) {
    return (
      <Loading size="small" />
    )
  }

  const renderGroups = (
    groups.length && groups[0].users.length ? (
      groups.map(group => {
        let userNames = ""
        group.users.map(user => {
          userNames += user.name + "  "
        })
        return (
          <GroupNameWrapper key={group.ownerId}>
            <FeatherIcon name="users" size={25} style={{ color: COLORS.BASE_BLACK }} />
            <GroupNameText>{truncateText(userNames, 40)}</GroupNameText>
            {currentGroupId === group.ownerId ? <Icon name="check-circle" size={25}  style={{ color: '#32CD32' }}/> : null}
          </GroupNameWrapper>
        )
      })
    ) : (
      null
    )
  )

  return (
    <Modal isVisible={showTransferModal}>
      <Container>
        <TransferTitle>グループを切り替える</TransferTitle>
        <GroupContainer>
          {renderGroups}
        </GroupContainer>
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
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 20px 0 15px 0;
  color: ${COLORS.BASE_BLACK};
`

const GroupContainer = styled.View`
`

const GroupNameWrapper = styled.View`
  flex-direction: row;
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 1px;
  padding: 10px 20px;
`

const GroupNameText = styled.Text`
  width: 85%;
  padding: 0 20px 0 15px;
  color: ${COLORS.BASE_BLACK};
  font-size: 20px;
`
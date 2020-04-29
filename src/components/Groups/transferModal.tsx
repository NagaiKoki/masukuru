import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-native-modal';
import { COLORS } from '../../constants/Styles';
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/FontAwesome'
// import component
import Loading from '../Loading'
// import apis
import { requestBelongGroups, requestTransfer } from '../../apis/Groups/transfer'
// import lib
import truncateText from '../../lib/truncateText'

interface TransferModalProps {
  showTransferModal: boolean
  currentGroupId: string
  setShowTransferModal: Dispatch<SetStateAction<boolean>>
  navigation: any
  setDrawerIsLoading: Dispatch<SetStateAction<boolean>>
  setCurrentGroupId: Dispatch<SetStateAction<string>>
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
  const { showTransferModal, 
          currentGroupId, 
          setShowTransferModal, 
          navigation, 
          setDrawerIsLoading,
          setCurrentGroupId } = props 

  useEffect(() => {
    getBelongGroups()
    setIsloading(false)
  }, [])

  const getBelongGroups = async () => {
    const groups = await requestBelongGroups()
    setGroups(groups)
    return;
  }

  const handleCloseModal = () => {
    setShowTransferModal(false)
  }

  const handleTransfer = (groupId: string) => {
    if (currentGroupId === groupId) {
      return;
    } else {
      setDrawerIsLoading(true)
      setTimeout(() => {
        requestTransfer(groupId)
        navigation.navigate('main', { currentGroupId: groupId })
        setCurrentGroupId(groupId)
        setIsloading(false)
        setShowTransferModal(false)
        setDrawerIsLoading(false)
      }, 1000)
    }
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
          <GroupNameWrapper key={group.ownerId} onPress={() => handleTransfer(group.ownerId)}>
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
    <Modal isVisible={showTransferModal} swipeDirection='down' onSwipeComplete={handleCloseModal}>
      <Container>
        <CloseBar />
        <TransferTitleWrapper>
          <TransferTitle>グループを切り替える</TransferTitle>
        </TransferTitleWrapper>
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
  padding: 5px 0px;
  max-height: 450px;
  min-height: 300px;
  background-color: ${COLORS.BASE_BACKGROUND};
  align-self: center;
`
const TransferTitleWrapper = styled.View`
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
  border-bottom-width: 1px;
  padding-bottom: 10px;
`

const TransferTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding: 20px 0 15px 0;
  color: ${COLORS.BASE_BLACK};
`

const GroupContainer = styled.View`
`

const GroupNameWrapper = styled.TouchableOpacity`
  flex-direction: row;
  border-bottom-color: ${COLORS.BASE_BORDER_COLOR};
  border-bottom-width: 1px;
  padding: 15px 20px;
`

const GroupNameText = styled.Text`
  width: 85%;
  padding: 0 20px 0 15px;
  color: ${COLORS.BASE_BLACK};
  font-size: 20px;
`

const CloseBar = styled.View`
  background-color: ${COLORS.BASE_BLACK};
  height: 5px;
  width: 100px;
  margin-top: 7px;
  border-radius: 60px;
  align-self: center;
`
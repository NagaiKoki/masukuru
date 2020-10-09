import React, { useState } from 'react'
import { Alert } from 'react-native'
import styled from 'styled-components'
// import components
import Item from './Item'
import GroupSwitchModal from '../Groups/Modal/Switch'
import GroupInviteModal from '../Groups/Modal/Invite'
import GroupJoinModal from '../Groups/Modal/Join/JoinGroupModal'
import FeedbackModal from '../Feedback'
import SnsShareModal from '../Groups/Modal/Invite/SnsShare'
// import types
import { DrawerItemType } from './Item'
// import selectors
import { useAuthSelectors } from '../../selectors/auth'
// import utils
import { handleAlert } from '../../utilities/Alert/'

type PropsType = {
  navigation: any
}

const DrawerList = (props: PropsType) => {
  const { navigation } = props
  const [switchGroupModalOpen, setSwitchGroupModalOpen] = useState(false)
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [snsModalOpen, setSnsModalOpen] = useState(false)
  const [joinModalOpen, setJoinModalOpen] = useState(false)
  const [feedBackModalOpen, setFeedbackModalOpen] = useState(false)
  const { requestFetchLogout } = useAuthSelectors()

  const handleNavigateMyPage = () => {
    navigation.navigate('MyPage')
  }

  const handleNavigateSetting = () => {
    navigation.navigate('setting')
  }

  const handleOpenSwitchModal = () => {
    setSwitchGroupModalOpen(!switchGroupModalOpen)
  }

  const handleCloseSwitchModal = () => {
    setSwitchGroupModalOpen(false)
  }

  const handleOpenInviteModal = () => {
    setInviteModalOpen(true)
  }

  const handleCloseInviteModal = () => {
    setInviteModalOpen(false)
  }

  const handleOpenSnsModal = () => {
    setSnsModalOpen(true)
  }

  const handleCloseSnsModal = () => {
    setSnsModalOpen(false)
  }

  const handleOpenJoinModal = () => {
    setJoinModalOpen(true)
  }

  const handleCloseJoinModal = () => {
    setJoinModalOpen(false)
  }

  const handleOpenFeedbackModal = () => {
    setFeedbackModalOpen(true)
  }

  const handleCloseFeedbackModal = () => {
    setFeedbackModalOpen(false)
  }

  const handleLogout = () => {
    const title = 'マスクル'
    const subTitle = 'ログアウトしますか？'
    const buttonText = 'ログアウトする'
    handleAlert(title, subTitle, buttonText, requestFetchLogout)
  }  

  const listMapObj: DrawerItemType[] = [
    { text: 'マイページ', iconName: 'user', onClick: handleNavigateMyPage },
    { text: 'グループを切り替える', iconName: 'people', onClick: handleOpenSwitchModal },
    { text: 'グループに招待する', iconName: 'people', onClick: handleOpenInviteModal },
    { text: 'グループに参加する', iconName: 'envelope-open', onClick: handleOpenJoinModal },
    { text: 'フィードバック', iconName: 'question', onClick: handleOpenFeedbackModal },
    { text: '設定', iconName: 'settings', onClick: handleNavigateSetting },
    { text: 'ログアウト', iconName: 'logout', onClick: handleLogout },
  ]

  const renderList = listMapObj.map((item, i) => (
    <Item key={i} text={item.text} iconName={item.iconName} onClick={item.onClick} />
  ))

  return (
    <Wrapper>
      {renderList}
      <GroupSwitchModal isOpen={switchGroupModalOpen} navigation={navigation} handleOnClose={handleCloseSwitchModal} />
      <GroupInviteModal isOpen={inviteModalOpen} handleOnCloseInviteModal={handleCloseInviteModal} handleOpenSnsShareModal={handleOpenSnsModal} />
      <SnsShareModal isOpen={snsModalOpen} handleCloseModal={handleCloseSnsModal} />
      <GroupJoinModal isOpen={joinModalOpen} authorized={true} navigation={navigation} handleCloseModal={handleCloseJoinModal} />
      <FeedbackModal isOpen={feedBackModalOpen} handleOnClose={handleCloseFeedbackModal} />
    </Wrapper>
  )
}

export default DrawerList

const Wrapper = styled.View`
  padding: 20px 0;
`
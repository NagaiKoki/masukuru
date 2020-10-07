import React, { useState } from 'react'
import styled from 'styled-components'
// import components
import Item from './Item'
import GroupSwitchModal from '../Groups/Modal/Switch'
import GroupInviteModal from '../Groups/Modal/Invite'
// import types
import { DrawerItemType } from './Item'
// import selectors
import { useAuthSelectors } from '../../selectors/auth'

type PropsType = {
  navigation: any
}

const DrawerList = (props: PropsType) => {
  const { navigation } = props
  const [switchGroupModalOpen, setSwitchGroupModalOpen] = useState(false)
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [snsModalOpen, setSnsModalOpen] = useState(false)
  const { requestFetchLogout } = useAuthSelectors()

  const handlePressMyPage = () => {
    navigation.navigate('MyPage')
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
    setInviteModalOpen(true)
  }

  const handleCloseSnsModal = () => {
    setInviteModalOpen(false)
  }

  const handleRequestLogout = () => {
    requestFetchLogout()
  }

  const listMapObj: DrawerItemType[] = [
    { text: 'マイページ', iconName: 'user', onClick: handlePressMyPage },
    { text: 'グループを切り替える', iconName: 'people', onClick: handleOpenSwitchModal },
    { text: 'グループに招待する', iconName: 'people', onClick: handleOpenInviteModal },
    { text: 'ログアウト', iconName: 'logout', onClick: handleRequestLogout },
  ]

  const renderList = listMapObj.map((item, i) => (
    <Item key={i} text={item.text} iconName={item.iconName} onClick={item.onClick} />
  ))

  return (
    <Wrapper>
      {renderList}
      <GroupSwitchModal isOpen={switchGroupModalOpen} navigation={navigation} handleOnClose={handleCloseSwitchModal} />
      <GroupInviteModal isOpen={inviteModalOpen} handleOnCloseInviteModal={handleCloseInviteModal} handleOpenSnsShareModal={handleOpenSnsModal} />
    </Wrapper>
  )
}

export default DrawerList

const Wrapper = styled.View`
  padding: 20px 0;
`
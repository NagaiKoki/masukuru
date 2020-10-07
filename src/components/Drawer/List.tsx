import React, { useState } from 'react'
import styled from 'styled-components'
// import components
import Item from './Item'
import GroupSwitchModal from '../Groups/Modal/Switch'
// import types
import { DrawerItemType } from './Item'

type PropsType = {
  navigation: any
}

const DrawerList = (props: PropsType) => {
  const { navigation } = props
  const [switchGroupModalOpen, setSwitchGroupModalOpen] = useState(false)

  const handlePressMyPage = () => {
    navigation.navigate('MyPage')
  }

  const handleToggleSwitchGroup = () => {
    setSwitchGroupModalOpen(!switchGroupModalOpen)
  }

  const listMapObj: DrawerItemType[] = [
    { text: 'マイページ', iconName: 'user', onClick: handlePressMyPage },
    { text: 'グループを切り替える', iconName: 'people', onClick: handleToggleSwitchGroup }
  ]

  const renderList = listMapObj.map((item, i) => (
    <Item key={i} text={item.text} iconName={item.iconName} onClick={item.onClick} />
  ))

  return (
    <Wrapper>
      {renderList}
      <GroupSwitchModal isOpen={switchGroupModalOpen} handleOnClose={handleToggleSwitchGroup} />
    </Wrapper>
  )
}

export default DrawerList

const Wrapper = styled.View`
  padding: 20px 0;
`
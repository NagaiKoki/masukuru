import React from 'react'
import styled from 'styled-components'
// import components
import Item from './Item'
// import types
import { DrawerItemType } from './Item'

type PropsType = {
  navigation: any
}

const DrawerList = (props: PropsType) => {
  const { navigation } = props

  const handlePressMyPage = () => {
    navigation.navigate('MyPage')
  }

  const listMapObj: DrawerItemType[] = [
    { text: 'マイページ', iconName: 'user', onClick: handlePressMyPage }
  ]

  const renderList = listMapObj.map((item, i) => (
    <Item key={i} text={item.text} iconName={item.iconName} onClick={item.onClick} />
  ))

  return (
    <Wrapper>
      {renderList}
    </Wrapper>
  )
}

export default DrawerList

const Wrapper = styled.View`
  padding: 20px 0;
`
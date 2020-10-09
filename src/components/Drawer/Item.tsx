import React from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import constants
import { COLORS } from '../../constants/Styles'

export type DrawerItemType = {
  text: string
  iconName: string
  onClick: () => void
}

const DrawerItem = (props: DrawerItemType) => {
  const { text, iconName, onClick } = props

  return (
    <Wrapper onPress={onClick}>
      <Icon name={iconName} size={20} style={{ color: COLORS.BASE_BORDER_COLOR, paddingRight: 15 }} />
      <Label>{text}</Label>
    </Wrapper>
  )
}

export default DrawerItem

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px 0;
`

const Label = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 18px;
`
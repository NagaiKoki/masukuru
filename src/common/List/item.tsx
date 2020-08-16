import React from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../constants/Styles';

interface ItemProps {
  title: string
  icon?: JSX.Element
  handleOnClick: () => void
}

const Item = (props: ItemProps) => {
  const { title, icon, handleOnClick } = props

  return (
    <ItemWrapper onPress={() => handleOnClick() } activeOpacity={1}>
      <ItemText>{title}</ItemText>
      {icon}
    </ItemWrapper>
  )
}

const ItemWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: ${COLORS.BORDER_COLOR_1};
  border-bottom-width: 1px;
  padding: 8px 20px;
`

const ItemText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 18px;
  font-weight: bold;
`

export default Item
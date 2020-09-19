import React from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome'
// import constants
import { COLORS } from '../../../constants/Styles'

interface Props {
  direction: 'forward' | 'backward'
  disable: boolean
  activeOpacity: number
  handleOnClick: () => void
}

const SelectTermBtn = (props: Props) => {
  const { direction, disable, activeOpacity, handleOnClick } = props
  return (
    <IconButton onPress={handleOnClick} disable={disable} activeOpacity={activeOpacity}>
      <Icon name={ direction === 'backward' ? "angle-left" : "angle-right" } size={25} />
    </IconButton>
  )
}

export default SelectTermBtn

const IconButton = styled.TouchableOpacity<{ disable?: boolean }>`
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  border-radius: 30;
  background: ${props =>  props.disable ? COLORS.BASE_WHITE : COLORS.SUB_BACKGROUND};
`
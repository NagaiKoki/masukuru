import React from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../constants/Styles'

type PropsType = {
  text: string
  color?: string
  handleOnClick: () => void
}

const OutlineButton = (props: PropsType) => {
  const { text, color, handleOnClick } = props
  
  return (
    <Wrapper color={color} activeOpacity={0.8} onPress={handleOnClick}> 
      <ButtonText color={color}>{text}</ButtonText>
    </Wrapper>
  )
}

export default OutlineButton

const Wrapper = styled.TouchableOpacity<{ color?: string }>`
  border-radius: 4px;
  border: 1px solid ${props => props.color ? props.color : COLORS.BASE_MUSCLEW};
  padding: 10px 15px;
`

const ButtonText = styled.Text<{ color?: string }>`
  color: ${props => props.color ? props.color : COLORS.BASE_WHITE};
  font-size: 14px;
  text-align: center;
`
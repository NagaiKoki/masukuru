import React from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../constants/Styles'

interface ButtonProps {
  text: string
  background?: string
  textColor?: string
  handleOnClick: () => void
}

const Button = (props: ButtonProps) => {
  const { background, text, textColor, handleOnClick } = props
  return (
    <Wrapper background={background} activeOpacity={0.8} onPress={handleOnClick}>
      <ButtonText textColor={textColor}>{text}</ButtonText>
    </Wrapper>
  )
}

export default Button

const Wrapper = styled.TouchableOpacity<{ background?: string }>`
  border-radius: 4px;
  background: ${props => props.background ? props.background : COLORS.BASE_MUSCLEW};
  padding: 10px 15px;
`

const ButtonText = styled.Text<{ textColor?: string }>`
  color: ${props => props.textColor ? props.textColor : COLORS.BASE_WHITE};
  font-size: 14px;
  text-align: center;
`
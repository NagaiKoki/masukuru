import React from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../constants/Styles'

interface ButtonProps {
  text: string
  background?: string
  isRound?: boolean
  textColor?: string
  fontSize?: number
  bold?: boolean
  padding?: string
  disabled?: boolean
  handleOnClick: () => void
}

const Button = (props: ButtonProps) => {
  const { background, text, fontSize, bold, padding, isRound, textColor, disabled, handleOnClick } = props
  return (
    <Wrapper 
      background={background} 
      isRound={isRound}
      padding={padding}
      activeOpacity={disabled ? 1 : 0.8} 
      disabled={disabled}
      onPress={handleOnClick}
    >
      <ButtonText 
        textColor={textColor}
        fontSize={fontSize}
        bold={bold}
      >
        {text}
      </ButtonText>
    </Wrapper>
  )
}

export default Button

const Wrapper = styled.TouchableOpacity<{ background?: string; isRound?: boolean; padding?: string ; disabled?: boolean}>`
  border-radius: ${props => props.isRound ? '30px' : '4px'};
  background: ${props => props.background ? props.background : COLORS.BASE_MUSCLEW};
  padding: ${props => props.padding ? props.padding : '10px 15px;' };
  opacity: ${props => props.disabled ? 0.5 : 1};
`

const ButtonText = styled.Text<{ textColor?: string; fontSize?: number, bold?: boolean }>`
  color: ${props => props.textColor ? props.textColor : COLORS.BASE_WHITE};
  font-size: ${[props => props.fontSize ? `${props.fontSize}px` : '14px' ]};
  font-weight: ${props => props.bold ? 'bold' : 300};
  text-align: center;
`
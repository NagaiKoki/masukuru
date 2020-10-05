import React from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../constants/Styles'

type FormProps = {
  placeholder?: string
  maxLength?: number
  onChange: (text: number) => void
}

const NumberForm = (props: FormProps) => {
  const { placeholder, maxLength, onChange } = props

  return (
    <TextInput
      placeholder={placeholder}
      autoCapitalize={'none'}
      maxLength={maxLength}
      keyboardType={'numeric'}
      returnKeyType="done"
      autoCorrect={false}
      onChangeText={(value: number) => onChange(value)}
    />
  )
}

export default NumberForm

const TextInput = styled.TextInput`
  align-self: center;
  width: 100%;
  height: 45px;
  margin: 10px 0;
  border-radius: 5px;
  padding: 10px;
  font-size: 17px;
  background-color: ${COLORS.FORM_BACKGROUND};
  color: ${COLORS.BASE_BLACK};
`
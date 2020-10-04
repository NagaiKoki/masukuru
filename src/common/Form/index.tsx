import React from 'react'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../constants/Styles'

interface FormProps {
  placeholder?: string
  maxLength?: number
  value?: string
  secureTextEntry?: boolean
  onChange: (text: string) => void
}

const Form = (props: FormProps) => {
  const { placeholder, maxLength, secureTextEntry, value, onChange } = props

  return (
    <TextInput
      placeholder={placeholder}
      autoCapitalize={'none'}
      autoCorrect={false}
      maxLength={maxLength}
      value={value}
      secureTextEntry={!!secureTextEntry}
      onChangeText={text => onChange(text)}
    />
  )
}

const TextInput = styled.TextInput`
  align-self: center;
  width: 100%;
  height: 50px;
  margin: 10px 0;
  border-radius: 5px;
  padding: 15px 15px;
  font-size: 17px;
  background-color: ${COLORS.FORM_BACKGROUND};
  color: ${COLORS.BASE_BLACK};
`

export default Form
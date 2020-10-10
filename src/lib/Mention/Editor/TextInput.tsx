import React from 'react'
import styled from 'styled-components'
import { TextInput, ViewStyle } from 'react-native'

type PropsType = {
  text: string
  styles?: ViewStyle
  onChangeText: (value: string) => void
}

export const MentionTextInput = (props: PropsType) => {
  const { text, styles, onChangeText } = props
  
  return (
    <InputWrapper>
     <TextInput 
      value={text}
      style={styles}
      onChangeText={onChangeText}
    />
    </InputWrapper>
  )
}

const InputWrapper = styled.View`
  width: 100%;
`
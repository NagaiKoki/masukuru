import React from 'react'
import styled from 'styled-components'
import { TextInput } from 'react-native'

type PropsType = {
  text: string
  onChangeText: (value: string) => void
}

export const MentionTextInput = (props: PropsType) => {
  const { text, onChangeText } = props
  return (
    <TextInput 
      value={text}
      onChangeText={onChangeText}
    />
  )
}
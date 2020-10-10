import React from 'react'
import styled from 'styled-components'
// import components
import { MentionTextInput } from './TextInput'

type MentionPropsType = {
  text: string
  onChangeText: (value: string) => void
}

export const MentionEditor = (props: MentionPropsType) => {
  const { text, onChangeText } = props
  return (
    <MentionTextInput
      text={text}
      onChangeText={onChangeText}
    />
  )
}
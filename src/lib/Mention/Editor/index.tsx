import React from 'react'
import { ViewStyle } from 'react-native'
// import components
import { MentionTextInput } from './TextInput'

type MentionPropsType = {
  keyword: string
  mentionItems: string[]
  placeholder?: string
  textInputStyles?: ViewStyle
  multiline?: boolean
  onChangeText: (value: string) => void
}

export const MentionEditor = (props: MentionPropsType) => {
  const { keyword, mentionItems, placeholder, multiline, textInputStyles, onChangeText } = props 
  return (
    <MentionTextInput
      keyword={keyword}
      placeholder={placeholder}
      multiline={multiline}
      styles={textInputStyles}
      onChangeText={onChangeText}
    />
  )
}

MentionEditor.defaultProps = {
  multiline: true
} as MentionPropsType
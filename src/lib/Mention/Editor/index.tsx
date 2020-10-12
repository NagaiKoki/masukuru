import React from 'react'
import { ViewStyle } from 'react-native'
// import components
import { MentionTextInput } from './TextInput'
// import types
import { MentionItemType } from '../types'

type MentionPropsType = {
  keyword: string
  mentionItems: MentionItemType[]
  placeholder?: string
  textInputStyles?: ViewStyle
  multiline?: boolean
  onChangeText: (value: string) => void
  addMentionTarget?: (id: string) => void
  removeMentionTarget?: (id: string) => void
}

export const MentionEditor = (props: MentionPropsType) => {
  const { keyword, mentionItems, placeholder, multiline, textInputStyles, onChangeText, addMentionTarget, removeMentionTarget } = props 
  return (
    <MentionTextInput
      keyword={keyword}
      mentionItems={mentionItems}
      placeholder={placeholder}
      multiline={multiline}
      styles={textInputStyles}
      onChangeText={onChangeText}
      addMentionTarget={addMentionTarget}
    />
  )
}

MentionEditor.defaultProps = {
  multiline: true
} as MentionPropsType
import React from 'react'
import { ViewStyle } from 'react-native'
// import components
import { MentionTextInput } from './TextInput'
// import types
import { MentionItemType } from '../types'

type MentionPropsType = {
  keyword: string
  targets: { id: string, target: string }[]
  mentionItems: MentionItemType[]
  placeholder?: string
  textInputStyles?: ViewStyle
  multiline?: boolean
  onChangeText: (value: string) => void
  addMentionTarget?: (target: { id: string, target: string }) => void
  removeMentionTarget?: (id: string) => void
}

export const MentionEditor = (props: MentionPropsType) => {
  const { keyword, targets, mentionItems, placeholder, multiline, textInputStyles, onChangeText, addMentionTarget, removeMentionTarget } = props 
  return (
    <MentionTextInput
      keyword={keyword}
      targets={targets}
      mentionItems={mentionItems}
      placeholder={placeholder}
      multiline={multiline}
      styles={textInputStyles}
      onChangeText={onChangeText}
      addMentionTarget={addMentionTarget}
      removeMentionTarget={removeMentionTarget}
    />
  )
}

MentionEditor.defaultProps = {
  multiline: true
} as MentionPropsType
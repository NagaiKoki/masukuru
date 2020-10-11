import React from 'react'
import styled from 'styled-components'
import { TextInput, ViewStyle } from 'react-native'

type PropsType = {
  keyword: string
  placeholder?: string
  styles?: ViewStyle
  multiline?: boolean
  onChangeText: (value: string) => void
}

export const MentionTextInput = (props: PropsType) => {
  const { keyword, placeholder, multiline, styles, onChangeText } = props
  
  return (
     <TextInput 
      value={keyword}
      placeholder={placeholder}
      multiline={multiline}
      style={styles}
      onChangeText={onChangeText}
    />
  )
}
import React from 'react'
import { TextInput, ViewStyle } from 'react-native'
// import utils
import { checkAtSign } from './EditorUtils'

type PropsType = {
  keyword: string
  placeholder?: string
  styles?: ViewStyle
  multiline?: boolean
  onChangeText: (value: string) => void
}

export const MentionTextInput = (props: PropsType) => {
  const { keyword, placeholder, multiline, styles, onChangeText } = props

  const onChange = (text: string) => {
    const isAtSign = checkAtSign(text)
    onChangeText(text)
  }
  
  return (
     <TextInput 
      value={keyword}
      placeholder={placeholder}
      multiline={multiline}
      style={styles}
      onChangeText={onChange}
    />
  )
}
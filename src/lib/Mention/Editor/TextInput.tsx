import React, { useState } from 'react'
import styled from 'styled-components'
import { TextInput, ViewStyle } from 'react-native'
// import components
import { MentionList } from '../MentionList/List'
// import utils
import { checkAtSign } from './EditorUtils'

type PropsType = {
  keyword: string
  mentionItems: string[]
  placeholder?: string
  styles?: ViewStyle
  multiline?: boolean
  onChangeText: (value: string) => void
}

export const MentionTextInput = (props: PropsType) => {
  const { keyword, mentionItems, placeholder, multiline, styles, onChangeText } = props
  const [showList, setShowList] = useState(false)

  const onChange = (text: string) => {
    const isAtSign = checkAtSign(text)
    isAtSign ? setShowList(true) : setShowList(false)
    onChangeText(text)
  }

  const renderMentionList = showList &&
    <MentionList mentionItems={mentionItems} />
  
  return (
    <>
      {renderMentionList}
      <TextInput 
        value={keyword}
        placeholder={placeholder}
        multiline={multiline}
        style={styles}
        onChangeText={onChange}
      />
    </>
  )
}
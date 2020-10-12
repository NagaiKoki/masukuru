import React, { useState } from 'react'
import { TextInput, ViewStyle } from 'react-native'
// import components
import { MentionList } from '../MentionList/List'
// import types
import { MentionItemType } from '../types'
// import utils
import { checkAtSign, removeMentionTargetHandler } from './EditorUtils'

type PropsType = {
  keyword: string
  targets?: { id: string, target: string }[]
  mentionItems: MentionItemType[]
  placeholder?: string
  styles?: ViewStyle
  multiline?: boolean
  onChangeText: (value: string) => void
  addMentionTarget: (target: { id: string, target: string }) => void
  removeMentionTarget: (id: string) => void
}

export const MentionTextInput = (props: PropsType) => {
  const { keyword, targets, mentionItems, placeholder, multiline, styles, onChangeText, addMentionTarget, removeMentionTarget } = props
  const [showList, setShowList] = useState(false)

  const onChange = (text: string) => {
    const isAtSign = checkAtSign(text)
    removeMentionTargetHandler(targets, text, removeMentionTarget)
    isAtSign ? setShowList(true) : setShowList(false)
    onChangeText(text)
  }

  const handleCloseMention = () => {
    setShowList(false)
  }

  const addMentionInText = (mention: string) => {
    const concatText = keyword + mention + ' '
    return onChangeText(concatText)
  }

  const renderMentionList = showList &&
    <MentionList 
      mentionItems={mentionItems} 
      addMentionInText={addMentionInText} 
      handleCloseMention={handleCloseMention} 
      addMentionTarget={addMentionTarget} 
    />
  
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
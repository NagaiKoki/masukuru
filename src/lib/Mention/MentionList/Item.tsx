import React from 'react'
import styled from 'styled-components'
import { Image } from 'react-native'
// import types
import { MentionItemType } from '../types'

type PropsType = {
  mentionItem: MentionItemType
  addMentionInText: (mention: string) => void
  onClose: () => void
}

export const MentionItem = (props: PropsType) => {
  const { mentionItem, addMentionInText, onClose } = props
  const { name, imageUrl } = mentionItem

  const handleOnPress = () => {
    addMentionInText(name)
    onClose()
  }

  return (
    <Wrapper onPress={handleOnPress}>
      <Image source={{ uri: imageUrl }} style={{ height: 25, width: 25, borderRadius: 60, marginRight: 10 }} />
      <Item>{name}</Item>
    </Wrapper>
  )
}

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-top-width: 0.5px;
  border-top-color: #a1a6ab;
  padding: 8px 10px;
`

const Item = styled.Text`
  color: #484848;
  font-size: 14px;
  font-weight: bold;
`
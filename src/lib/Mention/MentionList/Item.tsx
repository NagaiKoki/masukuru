import React from 'react'
import styled from 'styled-components'

type PropsType = {
  mentionItem: string
  addMentionInText: (mention: string) => void
  onClose: () => void
}

export const MentionItem = (props: PropsType) => {
  const { mentionItem, addMentionInText, onClose } = props

  const handleOnPress = () => {
    addMentionInText(mentionItem)
    onClose()
  }

  return (
    <Wrapper onPress={handleOnPress}>
      <Item>{mentionItem}</Item>
    </Wrapper>
  )
}

const Wrapper = styled.TouchableOpacity`
  padding: 7px 10px;
  border-top-width: 0.5px;
  border-top-color: #a1a6ab;
`

const Item = styled.Text``
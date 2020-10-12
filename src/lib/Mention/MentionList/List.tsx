import React from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components'
// import components
import { MentionItem } from './Item'
// import types
import { MentionItemType } from '../types'

type PropsType = {
  mentionItems: MentionItemType[]
  addMentionInText: (mention: string) => void
  handleCloseMention: () => void
  addMentionTarget: (target: { id: string, target: string }) => void
}

export const MentionList = (props: PropsType) => {
  const { mentionItems, addMentionInText, handleCloseMention, addMentionTarget } = props
  let mentionWidth = Dimensions.get("window").width

  const list = mentionItems.map((item, i) => (
    <MentionItem key={i} mentionItem={item} addMentionInText={addMentionInText} onClose={handleCloseMention} addMentionTarget={addMentionTarget} />
  ))

  return (
    <Wrapper width={mentionWidth}>
      {list}
    </Wrapper>
  )
}

const Wrapper = styled.View<{ width: number }>`
  position: absolute;
  bottom: 71px;
  width: ${props => `${props.width}px`};
  background: #fff;
  z-index: 9999;
`

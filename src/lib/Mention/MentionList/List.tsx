import React from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components'
// import components
import { MentionItem } from './Item'

type PropsType = {
  mentionItems: string[]
}

export const MentionList = (props: PropsType) => {
  const { mentionItems } = props
  let mentionWidth = Dimensions.get("window").width

  const list = mentionItems.map((item, i) => (
    <MentionItem key={i} mentionItem={item} />
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

import React from 'react'
import styled from 'styled-components'
// import components
import { MentionItem } from './Item'

type PropsType = {
  mentionItems: string[]
}

export const MentionList = (props: PropsType) => {
  const { mentionItems } = props

  const list = mentionItems.map((item, i) => (
    <MentionItem key={i} mentionItem={item} />
  ))

  return (
    <Wrapper>
      {list}
    </Wrapper>
  )
}

const Wrapper = styled.View`

`

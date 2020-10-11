import React from 'react'
import styled from 'styled-components'

type PropsType = {
  mentionItem: string
}

export const MentionItem = (props: PropsType) => {
  const { mentionItem } = props
  return (
    <Wrapper>
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
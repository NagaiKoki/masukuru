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

const Wrapper = styled.TouchableOpacity``

const Item = styled.Text``
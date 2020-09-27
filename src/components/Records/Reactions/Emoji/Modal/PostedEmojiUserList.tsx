import React from 'react'
import styled from 'styled-components'
// import selector
import recordSelector from '../../../../../selectors/record'
// import utils
import { EMOJI_ITEMS } from '../../../../../utilities/Reaction/Emoji'

const UserList = () => {
  const { selectedEmojiIndex } = recordSelector()
  const emojiItem = EMOJI_ITEMS.filter(item => item.id === selectedEmojiIndex)[0]

  return (
    <Wrapper>
      <TitleWrapper>
        <EmojiWrapper>{emojiItem.emoji}</EmojiWrapper>
        <Title>{emojiItem.text}</Title>
      </TitleWrapper>
    </Wrapper>
  )
}

export default UserList

const Wrapper = styled.View``

const TitleWrapper = styled.View``

const EmojiWrapper = styled.Text``

const Title = styled.Text``
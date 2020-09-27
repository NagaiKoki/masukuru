import React from 'react'
import styled from 'styled-components'
// import selector
import recordSelector from '../../../../../selectors/record'
// import utils
import { EMOJI_ITEMS } from '../../../../../utilities/Reaction/Emoji'
// import components
import UserItem from './UserItem'
import Loading from '../../../../Loading'

const UserList = () => {
  const { selectedEmojiIndex, postedEmojiUsers, isPostEmojiUsersLoading } = recordSelector()
  const emojiItem = EMOJI_ITEMS.filter(item => item.id === selectedEmojiIndex)[0]

  const renderUserItems = postedEmojiUsers.map(user => {
    return <UserItem key={user.uid} user={user} />
  })

  if (isPostEmojiUsersLoading) {
    return <Loading size="small" />
  }

  return (
    <Wrapper>
      <TitleWrapper>
        <EmojiWrapper>{emojiItem.emoji}</EmojiWrapper>
        <Title>{emojiItem.text}</Title>
      </TitleWrapper>
      <UserItemsWrapper>
        {renderUserItems}
      </UserItemsWrapper>
    </Wrapper>
  )
}

export default UserList

const Wrapper = styled.View``

const TitleWrapper = styled.View``

const EmojiWrapper = styled.Text``

const Title = styled.Text``

const UserItemsWrapper = styled.View``
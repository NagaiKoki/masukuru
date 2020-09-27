import React from 'react'
import styled from 'styled-components'
// import selector
import recordSelector from '../../../../../selectors/record'
// import utils
import { EMOJI_ITEMS } from '../../../../../utilities/Reaction/Emoji'
// import components
import UserItem from './PostedEmojiUserItem'
import Loading from '../../../../Loading'
// import constants
import { COLORS } from '../../../../../constants/Styles';

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

const Wrapper = styled.View`
  padding: 20px;
`

const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const EmojiWrapper = styled.Text`
  font-size: 20px;
  margin-right: 10px;
`

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${COLORS.BASE_BLACK};
`

const UserItemsWrapper = styled.View`
  padding-top: 20px;
`
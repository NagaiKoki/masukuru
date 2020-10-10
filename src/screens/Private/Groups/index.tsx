import React, { useEffect } from 'react'
import styled from 'styled-components'
// import components
import Loading from '../../../components/Loading'
import { GroupImage, UnSettingGroupImage } from '../../../components/Image/groupImage'
import Button from '../../../common/Button'
// import selectors
import { useGroupSelector } from '../../../selectors/group'
// import constants
import { COLORS } from '../../../constants/Styles'

const GroupScreen = ({ navigation }) => {
  const { currentGroup, currentGroupUsers, requestFetchCurrentGroup, requestFetchCurrentGroupUsers } = useGroupSelector()

  useEffect(() => {
    requestFetchCurrentGroup()
    requestFetchCurrentGroupUsers()
  }, [])

  const handleOnNavigate = () => {
    navigation.navigate('groupEdit', { currentGroup, groupUsersImages })
  }

  if (!currentGroup.id || !currentGroupUsers.length) {
    return <Loading size="small" />
  }

  const { imageUrl, groupName, ownerId } = currentGroup
  const groupUsersImages = currentGroupUsers.map(user => {
    return user.imageUrl
  })
  const hostUser = currentGroupUsers.filter(user => user.uid === ownerId)[0]

  const renderImage = imageUrl ? 
    <GroupImage url={imageUrl} width={90} height={90} /> :
    <UnSettingGroupImage urls={groupUsersImages} width={90} height={90} />
  
  const renderUserName = currentGroupUsers.map(user => {
    return (
      <ItemText key={user.uid}>{user.name}</ItemText>
    )
  })

  return (
    <Container>
      <ImageWrapper>
        {renderImage}
      </ImageWrapper>
      <ItemWrapper>
        <Label>グループ名</Label>
        <ItemText>{groupName || '未設定'}</ItemText>
      </ItemWrapper>
      <ItemWrapper>
        <Label>ホストユーザー</Label>
        <ItemText>{ hostUser ?  hostUser.name : '離脱済'}</ItemText>
      </ItemWrapper>
      <ItemWrapper>
        <Label>メンバー</Label>
        {renderUserName}
      </ItemWrapper>
      <ButtonWrapper>
        <Button text="グループを編集する" bold={true} fontSize={16} padding="15px 0" handleOnClick={handleOnNavigate} />
      </ButtonWrapper>
    </Container>
  )
}

export default GroupScreen

const Container = styled.ScrollView`
  flex: 1;
  padding: 15px;
  background: ${COLORS.BASE_WHITE};
`

const ImageWrapper = styled.View`
  align-self: center;
  padding: 20px 0;
`

const ItemWrapper = styled.View`
  padding: 15px 0;
`

const Label = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  font-weight: bold;
`

const ItemText = styled.Text`
  padding: 10px 0 0 5px;
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
`

const ButtonWrapper = styled.View`
  padding: 20px 0 40px 0;
`
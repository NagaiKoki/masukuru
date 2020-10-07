import React from 'react'
import styled from 'styled-components'
// import components
import UserImage from '../../../components/Image/userImage'
// import constants
import { COLORS } from '../../../constants/Styles'
// import types
import { GroupUserType } from '../../../types/Group/'
// import utils
import truncateText from '../../../utilities/truncateText'

type PropsType = {
  groupUser: GroupUserType
  navigation: any
}

const MemberItem = (props: PropsType) => {
  const { groupUser, navigation } = props
  const { imageUrl, name } = groupUser

  const handleOnClick = () => {
    navigation.navigate('UserPage', { user: groupUser })
  }

  return (
    <Wrapper onPress={handleOnClick}>
      <UserImage uri={imageUrl} width={45} height={45} borderRadius={60} />
      <NameText>{truncateText(name, 8)}</NameText>
    </Wrapper>
  )
}

export default MemberItem

const Wrapper = styled.TouchableOpacity`
  padding: 0 5px;
`

const NameText = styled.Text`
  padding-top: 3px;
  color: ${COLORS.BASE_BLACK};
  font-size: 10px;
  text-align: center;
`
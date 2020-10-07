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
  onClick: () => void
}

const MemberItem = (props: PropsType) => {
  const { groupUser, onClick } = props
  const { imageUrl, name } = groupUser

  return (
    <Wrapper onPress={onClick}>
      <UserImage uri={imageUrl} width={45} height={45} borderRadius={60} />
      <NameText>{truncateText(name, 10)}</NameText>
    </Wrapper>
  )
}

export default MemberItem

const Wrapper = styled.TouchableOpacity`
  padding: 0 10px;
`

const NameText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 12px;
  text-align: center;
`
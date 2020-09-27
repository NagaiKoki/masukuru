import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
// import components
import UserImage from '../../../../Image/userImage'
// import types
import { UserType } from '../../../../../types/User'
import { COLORS } from '../../../../../constants/Styles';
// import config
import firebase from '../../../../../config/firebase'
// import slice
import { requestDeleteEmojiReaction, toggleEmojiPostUserModal } from '../../../../../slice/record'
// import utils
import { hapticFeedBack } from '../../../../../utilities/Haptic'

interface PropsType {
  user: UserType
}

const UserItem = (props: PropsType) => {
  const { user } = props
  const { uid, name, imageUrl } = user
  const dispatch = useDispatch()

  const isMine = firebase.auth().currentUser.uid === uid

  const handleOnDelete = () => {
    hapticFeedBack('medium')
    dispatch(requestDeleteEmojiReaction())
    dispatch(toggleEmojiPostUserModal({ isOpen: false }))
  }

  return (
    <Container>
      <Wrapper>
        <ImageWrapper>
          <UserImage uri={imageUrl} width={40} height={40} borderRadius={60} />
        </ImageWrapper>
        <UserName>{name}</UserName>
      </Wrapper>
      { isMine ?
        <CancelBtn onPress={handleOnDelete}>
          <CancelText>取消</CancelText>
        </CancelBtn> : null
      }
    </Container>
  )
}

export default UserItem

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

const ImageWrapper = styled.View`
  margin-right: 15px;
`

const UserName = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 14px;
  font-weight: bold;
`

const CancelBtn = styled.TouchableOpacity`
  border: 1px solid ${COLORS.BASE_BORDER_COLOR};
  border-radius: 4px;
  margin-right: 10px;
  padding: 3px 8px;
`

const CancelText = styled.Text`
  color: ${COLORS.SUB_BLACK};
  font-size: 14px;
`
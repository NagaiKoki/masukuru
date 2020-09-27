import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
// import constants
import { COLORS } from '../../../../../constants/Styles';
// import slices
import { toggleEmojiPostUserModal } from '../../../../../slice/record'
// import components
import BottomModal from '../../../../../common/Modal/BottomModal'
import UserList from './PostedEmojiUserList'

interface PropsType {
  isOpen: boolean
}

const EmojiModal = (props: PropsType) => {
  const { isOpen } = props
  const dispatch = useDispatch()

  const handleOnClose = () => {
    dispatch(toggleEmojiPostUserModal({ isOpen: false }))
  }

  const renderModalContent =
    <Container>
      <UserList />
    </Container>

  return (
    <BottomModal isOpen={isOpen} onClose={handleOnClose}>
      {renderModalContent}
    </BottomModal>
  )
}

export default EmojiModal

const Container = styled.View`
  height: 200px;
  background: ${COLORS.BASE_WHITE};
`
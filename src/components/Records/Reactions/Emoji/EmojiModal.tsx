import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
// import constants
import { COLORS } from '../../../../constants/Styles';
// import slices
import { toggleEmojiModalOpen } from '../../../../slice/record'
// import components
import BottomModal from '../../../../common/Modal/BottomModal'
import EmojiList from './EmojiList'

interface PropsType {
  isOpen: boolean
}

const EmojiModal = (props: PropsType) => {
  const { isOpen } = props
  const dispatch = useDispatch()

  const handleOnClose = () => {
    dispatch(toggleEmojiModalOpen({ isOpen: false }))
  }

  const renderModalContent =
    <Container>
      <EmojiList />
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
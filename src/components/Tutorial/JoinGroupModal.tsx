import React from 'react'
import styled from 'styled-components'
// import components
import BottomModal from '../../common/Modal/BottomModal'
// import constants
import { COLORS } from '../../constants/Styles'

type PropsType = {
  isOpen: boolean
  handleCloseModal: () => void
}

const JoinGroupModal = (props: PropsType) => {
  const { isOpen, handleCloseModal } = props

  return (
    <BottomModal isOpen={isOpen} onClose={handleCloseModal}>
      <Container>

      </Container>
    </BottomModal>
  )
}

export default JoinGroupModal

const Container = styled.View`
  height: 500px;
  background: ${COLORS.BASE_WHITE};
`
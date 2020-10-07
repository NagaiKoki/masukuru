import React from 'react'
import styled from 'styled-components'
// import components
import BottomModal from '../../../../common/Modal/BottomModal'

type PropsType = {
  isOpen: boolean
  handleOnClose: () => void
}

const GroupSwitchModal = (props: PropsType) => {
  const { isOpen, handleOnClose } = props

  return (
    <BottomModal isOpen={isOpen} onClose={handleOnClose}>
      <Container>
        
      </Container>
    </BottomModal>
  )
}

export default GroupSwitchModal

const Container = styled.View``
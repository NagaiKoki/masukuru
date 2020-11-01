import React from 'react'
import Modal from 'react-native-modalbox'
import styled from 'styled-components'
// import constants
import { COLORS } from '../../constants/Styles';

interface PropsType {
  isOpen: boolean
  children: React.ReactElement
  height?: number
  onClose: () => void
}

const BottomModal = (props: PropsType) => {
  const { isOpen, children, height, onClose } = props

  return (
    <Modal
      isOpen={isOpen}
      onClosed={onClose}
      position='bottom'
      coverScreen
      useNativeDriver={true}
      style={{ height: height || 500 }}
    >
      <CloseBar />
      {children}
    </Modal>
  )
}

export default BottomModal

const CloseBar = styled.View`
  align-self: center;
  margin-top: 7px;
  border-radius: 20px;
  width: 150px;
  height: 5px;
  background: ${COLORS.SUB_BLACK};
`
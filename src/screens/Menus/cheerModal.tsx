import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { CHEER_MESSAGE } from '../../constants/chreeMessage'

interface CheerProps {
  itemLength: number
  messageVisible: boolean
  setMessageVisible: Dispatch<SetStateAction<boolean>>
}

const CheerModal = (props: CheerProps) => {
  const { messageVisible, itemLength, setMessageVisible } = props

  const handleOnClose = () => {
    return setMessageVisible(false)
  }

  const renderTitle = (
    <MessageModalTitle>{itemLength}回目のトレーニング{"\n"}お疲れさまです♪</MessageModalTitle>
  )

  const renderMessage = () => {
    switch (itemLength) {
      case 1: {
        return <MessageText>{CHEER_MESSAGE.FIRST_TIME}</MessageText>
      }
      case 5: {
        return <MessageText>{CHEER_MESSAGE.FIFTH_TIME}</MessageText>
      }
      case 10: {
        return <MessageText>{CHEER_MESSAGE.TENTH_TIME}</MessageText>
      }
    }
  }

  return (
    <Modal isVisible={messageVisible}>
      <MessageModalWrapper>
        <ModalCloseBtn>
          <Icon name='close' size={30} onPress={handleOnClose}/>
        </ModalCloseBtn>
        {renderTitle}
        {renderMessage()}
      </MessageModalWrapper>
    </Modal>
  )
}

const MessageModalWrapper = styled.View`
  height: 200px;
  background-color: ${COLORS.BASE_BACKGROUND};
  border-radius: 10px;
`

const ModalCloseBtn = styled.TouchableOpacity`
  flex-direction: row-reverse;
  padding: 10px;
`

const MessageModalTitle= styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 22px;
  font-weight: bold;
  text-align: center;
`

const MessageText = styled.Text`
  margin-top: 30px;
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`

export default CheerModal;
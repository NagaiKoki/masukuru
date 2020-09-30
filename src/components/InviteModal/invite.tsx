import React, { useState, Dispatch, SetStateAction } from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Clipboard, Alert } from 'react-native'
import styled from 'styled-components';
// import constants
import { COLORS } from '../../constants/Styles';

interface InviteCodeModalProps {
  showInviteCodeModal: boolean
  setShowInviteCodeModal: any
  ownCode: string
  setShowSnsModal: Dispatch<SetStateAction<boolean>>
}

const InviteCodeModal = (props: InviteCodeModalProps) => {
  const { showInviteCodeModal, setShowInviteCodeModal, ownCode, setShowSnsModal } = props

  const copyInviteCode = (code) => {
    Clipboard.setString(code)
    Alert.alert('コピーされました！')
  }

  const handleShowShareModal = () => {
    setShowInviteCodeModal(false)
    setTimeout(() => {
      setShowSnsModal(true)
    }, 500)
  }

  const ShareButtons =
    <ShareWrapper onPress={handleShowShareModal}>
      <ShareButton>
        招待コードをSNSで共有する
      </ShareButton>
      <Icon name="share" size={20} style={{ color: COLORS.BASE_WHITE, marginLeft: 15 }} />
    </ShareWrapper>

  return (
    <Modal isVisible={showInviteCodeModal} swipeDirection='down' onSwipeComplete={() => setShowInviteCodeModal(false)}>
      <InviteModalView>
        <InviteCloseBar />
        <InviteCodeWrapper onPress={() => copyInviteCode(ownCode)}>
          <InviteCodeText>{ownCode}</InviteCodeText>
        </InviteCodeWrapper>
        <InviteSubText>タップするとコピーされます</InviteSubText>
        {ShareButtons}
        <InviteModalTitle>この招待コードを招待したい友達に教えてあげよう！</InviteModalTitle>
        <InviteSubText>※ グループに参加できる人数は最大で10人までです</InviteSubText>
      </InviteModalView>
    </Modal> 
  )
}

export default InviteCodeModal;

const InviteModalView = styled.View`
  position: absolute;
  bottom: -20px;
  width: 110%;
  border-radius: 10px;
  padding: 0 10px;
  height: 350px;
  background-color: ${COLORS.BASE_BACKGROUND};
  align-self: center;
`

const InviteModalTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  font-weight: bold;
  padding-top: 50px;
  text-align: center;
`

const ShareWrapper = styled.TouchableOpacity`
  width: 90%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 30px;
  background: ${COLORS.BASE_MUSCLEW};
  padding: 15px;
  border-radius: 5px;
`

const ShareButton = styled.Text`
  text-align: center;
  color: ${COLORS.BASE_WHITE};
  font-size: 16px;
  font-weight: bold;
`

const InviteCodeWrapper = styled.TouchableOpacity`
  align-items: center;
  width: 80%;
  margin: 0 auto;
  border: 1px solid ${COLORS.BASE_BORDER_COLOR};
  border-radius: 5px;
  margin-top: 30px;
`

const InviteCodeText = styled.Text`
  padding: 10px 50px;
  color: ${COLORS.BASE_BLACK};
  font-size: 30px;
  letter-spacing: 4px;
  font-weight: bold;
  text-align: center;
`

const InviteCloseBar = styled.View`
  background-color: ${COLORS.BASE_BLACK};
  height: 5px;
  width: 100px;
  margin-top: 7px;
  border-radius: 60px;
  align-self: center;
`

const InviteSubText = styled.Text`
  width: 80%;
  margin: 0 auto;
  margin-top: 8px;
  text-align: center;
  color: ${COLORS.SUB_BLACK};
`
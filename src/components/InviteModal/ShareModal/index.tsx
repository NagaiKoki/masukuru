import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/FontAwesome'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import constants
import { COLORS } from '../../../constants/Styles';
// import utils
import { openIviteCodeShareLinkWithSNS } from '../../../utilities/Link/twitter'

interface SnsModalProps {
  code: string
  show: boolean
  setShowSnsInviteModal: Dispatch<SetStateAction<boolean>>
}

const SnsInviteCodeShareModal = (props: SnsModalProps) => {
  const { code, show, setShowSnsInviteModal } = props

  const handleCloseModal = () => {
    setShowSnsInviteModal(false)
  }

  const renderSnsButtons =
    <SnsButtonsWrapper>
      <SnsButton onPress={ () => openIviteCodeShareLinkWithSNS(code, 'Twitter') }>
        <Icon name="twitter" size={50} style={{ color: COLORS.TWITTER_COLOR }} />
        <SnsButtonLabel>Twitter</SnsButtonLabel>
      </SnsButton>
      <SnsButton onPress={ () => openIviteCodeShareLinkWithSNS(code, 'Line') }>
        <FontistoIcon name="line" size={50} style={{ color: COLORS.LINE_COLOR }} />
        <SnsButtonLabel>Line</SnsButtonLabel>
      </SnsButton>
    </SnsButtonsWrapper>

  const renderCancelButton =
    <CancelButtonWrapper onPress={handleCloseModal}>
      <CancelButton>キャンセル</CancelButton>
    </CancelButtonWrapper>

  return (
    <Modal isVisible={show} swipeDirection="down" onSwipeComplete={handleCloseModal}>
      <SnsWrapper>
        {renderSnsButtons}
        {renderCancelButton}
      </SnsWrapper>
    </Modal>
  )
}

export default SnsInviteCodeShareModal

const SnsWrapper = styled.View`
  align-self: center;
  position: absolute;
  bottom: -20px;
  width: 110%;
  border-radius: 10px;
  padding: 0 10px;
  height: 200px;
  background-color: ${COLORS.BASE_BACKGROUND};
`

const SnsButtonsWrapper = styled.View`
  flex-direction: row;
`

const SnsButton = styled.TouchableOpacity`
  justify-content: center;
  padding: 20px;
`

const SnsButtonLabel = styled.Text`
  padding-top: 7px;
  color: ${COLORS.BASE_BLACK};
  font-size: 12px;
  text-align: center;
`

const CancelButtonWrapper = styled.TouchableOpacity`
  border-top-color: ${COLORS.BASE_BORDER_COLOR};
  border-top-width: 0.3px;
  padding: 20px 0;
`

const CancelButton = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  text-align: center;
`
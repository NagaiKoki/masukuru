import React from 'react'
import styled from 'styled-components'
import BottomModal from '../../../../common/Modal/BottomModal'
import Icon from 'react-native-vector-icons/FontAwesome'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
// import constants
import { COLORS } from '../../../../constants/Styles';
// import utils
import { openIviteCodeShareLinkWithSNS } from '../../../../utilities/Link/twitter'
// import selectors
import { useGroupSelector } from '../../../../selectors/group'

interface SnsModalProps { 
  isOpen: boolean
  handleCloseModal: () => void
}

const SnsInviteCodeShareModal = (props: SnsModalProps) => {
  const { isOpen, handleCloseModal } = props
  const { currentGroup } = useGroupSelector()
  const { inviteCode } = currentGroup
  
  const renderSnsButtons =
    <SnsButtonsWrapper>
      <SnsButton onPress={ () => openIviteCodeShareLinkWithSNS(inviteCode, 'Twitter') }>
        <Icon name="twitter" size={50} style={{ color: COLORS.TWITTER_COLOR }} />
        <SnsButtonLabel>Twitter</SnsButtonLabel>
      </SnsButton>
      <SnsButton onPress={ () => openIviteCodeShareLinkWithSNS(inviteCode, 'Line') }>
        <FontistoIcon name="line" size={50} style={{ color: COLORS.LINE_COLOR }} />
        <SnsButtonLabel>Line</SnsButtonLabel>
      </SnsButton>
    </SnsButtonsWrapper>

  return (
    <BottomModal isOpen={isOpen} height={280} onClose={handleCloseModal}>
      <>
      <Title>SNSで招待コードをシェアする</Title>
      {renderSnsButtons}
      </>
    </BottomModal>
  )
}

export default SnsInviteCodeShareModal

const SnsButtonsWrapper = styled.View`
  flex-direction: row;
`

const Title = styled.Text`
  padding: 20px 0;
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
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
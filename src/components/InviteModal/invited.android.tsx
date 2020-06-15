import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components';
import Modal from 'react-native-modal'
import { COLORS } from '../../constants/Styles'
import { KeyboardAvoidingView } from 'react-native'

interface InvitedCodeModalProps {
  showInvitedCodeModal: boolean
  setShowInvitedCodeModal: Dispatch<SetStateAction<boolean>>
  setCodeText: Dispatch<SetStateAction<string>>
  replaceGroup: any
  codeText: string
}


const InvitedCodeModal = (props: InvitedCodeModalProps) => {
  const { showInvitedCodeModal, setShowInvitedCodeModal, setCodeText, replaceGroup, codeText  } = props

  // 招待コード送信制御
  const disableSubmit: boolean = (
    codeText && codeText.length === 6 ? false : true
  )

  return (
    <Modal isVisible={showInvitedCodeModal} swipeDirection='down' onSwipeComplete={() => setShowInvitedCodeModal(false)}>
        <InvitedModalView>
          <InviteCloseBar />
          <InvitedModalTitle>6桁の招待コードを入力しよう！</InvitedModalTitle>

          <InvitedModalFormWrapper>
            <InvitedModalForm 
              placeholder='6桁の招待コード'
              autoCapitalize={'none'}
              autoCorrect={ false }
              onChangeText={ text => setCodeText(text) }
              maxLength={6}
            />
          </InvitedModalFormWrapper>
          <InvitedSubText>※ 所属できるグループ数は5つまでです。</InvitedSubText>
          <InvitedSubText>※ 招待先のグループが5人以上の場合、参加できません。</InvitedSubText>

          <InvitedModalSubmitBtn block onPress={replaceGroup} disabled={disableSubmit} disableSubmit={disableSubmit}>
            <InvitedModalSubmitText>招待されたグループに参加する</InvitedModalSubmitText>
          </InvitedModalSubmitBtn>
        </InvitedModalView>
  </Modal>
  )
}

export default InvitedCodeModal;

// 招待コード入力モーダル
const InvitedModalView = styled.View`
  position: absolute;
  bottom: -20px;
  width: 110%;
  border-radius: 10px;
  height: 400px;
  background-color: ${COLORS.BASE_BACKGROUND};
  align-self: center;
`

const InvitedModalTitle = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 18px;
  padding-top: 30px;
  text-align: center;
`

const InvitedModalFormWrapper = styled.View`
  align-self: center;
  margin-top: 30px;
  width: 80%;
`

const InvitedModalForm = styled.TextInput`
  border: 1px solid ${COLORS.BASE_BORDER_COLOR};
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 5px;
  background-color: ${COLORS.BASE_WHITE};
  color: ${COLORS.BASE_BLACK};
`

const InvitedModalSubmitBtn = styled.TouchableOpacity<{disableSubmit: boolean }>`
  width: 80%;
  align-self: center;
  background-color: ${COLORS.BASE_MUSCLEW};
  padding: 15px 0;
  border-radius: 60px;
  margin-top: 30px;
  opacity: ${ props => ( props.disableSubmit ? 0.5 : 1 ) };
`

const InvitedModalSubmitText = styled.Text`
  color: ${COLORS.BASE_WHITE};
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`

const InvitedSubText = styled.Text`
  width: 85%;
  margin: 0 auto;
  margin-top: 8px;
  
  color: ${COLORS.SUB_BLACK};
`

const InviteCloseBar = styled.View`
  background-color: ${COLORS.BASE_BLACK};
  height: 5px;
  width: 100px;
  margin-top: 7px;
  border-radius: 60px;
  align-self: center;
`

const RecordShowCommentFormWrapper = styled.KeyboardAvoidingView`
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${COLORS.BASE_WHITE};
`
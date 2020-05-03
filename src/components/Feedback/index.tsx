import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import Modal from 'react-native-modal';

interface FeedbackProps {
  showFeedbackModal: boolean
  setShowFeedbackModal: Dispatch<SetStateAction<boolean>>
}

const FeedbackModal = (props: FeedbackProps) => {
  const { showFeedbackModal, setShowFeedbackModal } = props;
 
  const handleClose = () => {
    setShowFeedbackModal(false)
  }

  return (
    
      <Modal isVisible={showFeedbackModal}>
        <Container>
          <FeedbackHeader>
            <FeedbackClose onPress={handleClose}>
              <FeedbackCloseText>キャンセル</FeedbackCloseText>
            </FeedbackClose>
          </FeedbackHeader>
          <FeedbackWrapper>
            <FeedbackBtn>
              <FeedbackText>マスクルをレビューする</FeedbackText>
            </FeedbackBtn>
            <FeedbackBtn>
              <FeedbackText>お問い合わせする</FeedbackText>
            </FeedbackBtn>
          </FeedbackWrapper>
        </Container>
      </Modal>
    
  )
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
  width: 110%;
  margin-bottom: -20px;
  border-radius: 10px;
  align-self: center;
`

const FeedbackHeader = styled.View`
  height: 40px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #f4f4f4;
  justify-content: center;
`

const FeedbackClose = styled.TouchableOpacity`
 padding-left: 15px;
`

const FeedbackCloseText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
`

const FeedbackWrapper = styled.View`
  height: 100%;
  width: 80%;
  margin: 0 auto;
  padding: 30px 0;
`

const FeedbackBtn = styled.TouchableOpacity`
  padding: 10px 0;
`

const FeedbackText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
`


export default FeedbackModal;